import { onMounted, onUnmounted } from "vue";
import { isClientSide } from "~/utils/is-client-side";
import { useGlobalListeners } from "~/utils/use-global-listeners";

export type Modality = "keyboard" | "pointer" | "virtual";
type HandlerEvent = PointerEvent | MouseEvent | KeyboardEvent | FocusEvent;
type Handler = (modality: Modality, e: HandlerEvent) => void;

let currentModality: Modality | null = null;
let hasSetupGlobalListeners = false;
const changeHandlers = new Set<Handler>();

function triggerChangeHandlers(modality: Modality, e: HandlerEvent) {
  for (const handler of changeHandlers) {
    handler(modality, e);
  }
}

/**
 * If true, keyboard focus is visible.
 */
export function isFocusVisible(): boolean {
  return currentModality !== "pointer";
}

/**
 * If this is attached to text input component, return if the event is a focus event (Tab/Escape keys pressed) so that
 * focus visible style can be properly set.
 */
function isKeyboardFocusEvent(
  modality: Modality,
  e: HandlerEvent,
  options: { isTextInput?: boolean } = {}
) {
  const { isTextInput } = options;

  return !(
    isTextInput &&
    modality === "keyboard" &&
    e instanceof KeyboardEvent &&
    !(e.key === "Tab" || e.key === "Escape")
  );
}

/**
 * Helper function to determine if a KeyboardEvent is unmodified and could make keyboard focus styles visible.
 */
function isValidKey(e: KeyboardEvent) {
  // Control and Shift keys trigger when navigating back to the tab with keyboard.
  return (
    !e.metaKey &&
    !e.altKey &&
    !e.ctrlKey &&
    e.key !== "Control" &&
    e.key !== "Shift" &&
    e.key !== "Meta"
  );
}

function handleKeyboardEvent(e: KeyboardEvent) {
  if (!isValidKey(e)) return;

  currentModality = "keyboard";

  triggerChangeHandlers(currentModality, e);
}

function handlePointerEvent(e: PointerEvent | MouseEvent) {
  currentModality = "pointer";

  if (e.type !== "mousedown" && e.type !== "pointerdown") return;

  triggerChangeHandlers(currentModality, e);
}

export type FocusVisibleHandler = (isFocusVisible: boolean) => void;

function useSetupGlobalListeners() {
  const { addGlobalListener } = useGlobalListeners();

  if (!isClientSide() || hasSetupGlobalListeners) return;

  addGlobalListener(document, "keydown", handleKeyboardEvent, true);
  addGlobalListener(document, "keyup", handleKeyboardEvent, true);

  if (typeof PointerEvent !== "undefined") {
    addGlobalListener(document, "pointerdown", handlePointerEvent, true);
    addGlobalListener(document, "pointermove", handlePointerEvent, true);
    addGlobalListener(document, "pointerup", handlePointerEvent, true);
  } else {
    addGlobalListener(document, "mousedown", handlePointerEvent, true);
    addGlobalListener(document, "mousemove", handlePointerEvent, true);
    addGlobalListener(document, "mouseup", handlePointerEvent, true);
  }

  hasSetupGlobalListeners = true;
}

export function useFocusVisibleListener(
  fn: FocusVisibleHandler,
  options: { isTextInput?: boolean } = {}
): void {
  useSetupGlobalListeners();

  const handler: Handler = (modality, e) => {
    if (!isKeyboardFocusEvent(modality, e, options)) return;

    fn(isFocusVisible());
  };

  onMounted(() => {
    changeHandlers.add(handler);
  });

  onUnmounted(() => {
    changeHandlers.delete(handler);
  });
}
