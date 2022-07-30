import React from "react";

export interface FocusableBoxProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement;
}

export const FocusableBox: React.FC<FocusableBoxProps> = ({
  children,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  return React.cloneElement(children, {
    ...props,
    ref,
    tabIndex: -1,
  });
};

export default FocusableBox;
