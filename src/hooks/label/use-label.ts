import {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "~/shared/dom";
import { useId } from "../utils/use-id";
import { useLabels } from "../utils/use-labels";

export interface UseLabelProps extends HTMLAttributes {
  label?: string;
  labelElementType?: string;
}

export interface UseLabelResult {
  labelProps: LabelHTMLAttributes;
  fieldProps: InputHTMLAttributes;
}

export function useLabel(props: UseLabelProps = {}): UseLabelResult {
  const {
    id,
    label,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledbyProp,
    labelElementType = "label",
  } = props;

  const labelId = useId();
  const fieldId = useId(id);

  let ariaLabelledby = ariaLabelledbyProp;
  let labelProps: LabelHTMLAttributes = {};

  if (label) {
    ariaLabelledby = ariaLabelledbyProp
      ? `${ariaLabelledbyProp} ${labelId}`
      : labelId;

    labelProps = {
      id: labelId,
      for: labelElementType === "label" ? fieldId : undefined,
    };
  } else if (!ariaLabelledby && !ariaLabel) {
    console.warn(
      "If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility"
    );
  }

  const fieldProps: InputHTMLAttributes = useLabels({
    id: fieldId,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
  });

  return {
    labelProps,
    fieldProps,
  };
}
