import React from "react";
import PropTypes from "prop-types";
import MUIStack, { StackProps as MUIStackProps } from "@mui/material/Stack";

export type StackProps = MUIStackProps;

export const Stack: React.FC<StackProps> = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <MUIStack ref={ref} {...props}>
        {children}
      </MUIStack>
    );
  }
);

Stack.displayName = "Stack";
Stack.propTypes = {
  children: PropTypes.node,
};

export default Stack;
