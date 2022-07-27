import React from "react";
import Stack from "../../stack";

export interface FocusableBoxProps extends React.HTMLAttributes<HTMLElement> {
  focus?: boolean;
  defaultInFocus?: boolean;
}

export const FocusableBox: React.FC<FocusableBoxProps> = ({
  children,
  focus,
  defaultInFocus = true,
  ...props
}) => {
  const stackRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!defaultInFocus) return;

    stackRef.current?.focus();
  }, [defaultInFocus]);

  React.useEffect(() => {
    if (focus) return;

    stackRef.current?.focus();
  }, [focus]);

  return (
    <Stack ref={stackRef} tabIndex={-1} {...props}>
      {children}
    </Stack>
  );
};

FocusableBox.displayName = "FocusableBox";

export default FocusableBox;
