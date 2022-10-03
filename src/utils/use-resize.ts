import { onMounted } from "vue";
import { useListeners } from "./use-listeners";

export type ResizeHandler = (e: UIEvent) => void;

export function useResize(onResize: ResizeHandler): void {
  const { addListener } = useListeners();

  onMounted(() => {
    addListener(window, "resize", onResize, false);
  });
}
