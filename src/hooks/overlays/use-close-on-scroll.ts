import { Ref, watchEffect } from "vue";
import { useListeners } from "~/utils/use-listeners";

export interface UseCloseOnScrollProps<T extends HTMLElement = HTMLElement> {
  /**
   * The ref for the element which the overlay positions itself with respect to.
   */
  targetRef: Ref<T | null>;

  isOpen?: Ref<boolean>;

  onClose?: () => void;
}

export function useCloseOnScroll(props: UseCloseOnScrollProps): void {
  const { isOpen, targetRef, onClose } = props;
  const { addListener, removeAllListeners } = useListeners();

  watchEffect(() => {
    if (!isOpen?.value) {
      removeAllListeners();
      return;
    }

    const onScroll = (e: Event) => {
      const target = e.target as Element;

      // window is not a Node and doesn't have contain, but window contains everything
      if (
        !targetRef.value ||
        (target instanceof Node && !target.contains(targetRef.value))
      ) {
        return;
      }

      onClose?.();
    };

    addListener(window, "scroll", onScroll, true);
  });
}
