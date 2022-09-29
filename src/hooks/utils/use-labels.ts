import { HTMLAttributes } from "~/shared/dom";
import { useId } from "./use-id";

/**
 * Merges aria-label and aria-labelledby into aria-labelledby when both exist.
 * @param props - Aria label props.
 * @param defaultLabel - Default value for aria-label when not present.
 */
export function useLabels(
  props: HTMLAttributes,
  defaultLabel?: string
): HTMLAttributes {
  // If there is both an aria-label and aria-labelledby,
  // combine them by pointing to the element itself.
  const id = useId(props.id);

  let label: string | undefined = props["aria-label"];
  let labelledBy: string | undefined = props["aria-labelledby"];

  if (labelledBy && label) {
    const ids = new Set([...labelledBy.trim().split(/\s+/), id]);
    labelledBy = [...ids].join(" ");
  } else if (labelledBy) {
    labelledBy = labelledBy.trim().split(/\s+/).join(" ");
  }

  // If no labels are provided, use the default
  if (!label && !labelledBy && defaultLabel) {
    label = defaultLabel;
  }

  return {
    id,
    "aria-label": label,
    "aria-labelledby": labelledBy,
  };
}
