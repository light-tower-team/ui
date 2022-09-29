import { mergeProps } from "~/utils/merge-props";
import { useLabel, UseLabelProps, UseLabelResult } from "./use-label";

export interface UseFieldProps extends UseLabelProps {
  "aria-describedby"?: string;
}

export type UseFieldResult = UseLabelResult;

export function useField(props: UseFieldProps = {}): UseFieldResult {
  const { "aria-describedby": ariaDescribedby } = props;
  const { labelProps, fieldProps } = useLabel(props);

  return {
    labelProps,
    fieldProps: mergeProps(fieldProps, {
      "aria-describedby": ariaDescribedby,
    }),
  };
}
