import React from "react";
import PropTypes from "prop-types";
import MUIPopper, { PopperProps as MUIPopperProps } from "@mui/material/Popper";
import MUIPaper, { PaperProps as MUIPaperProps } from "@mui/material/Paper";
import Fade from "@mui/material/Fade";

export interface PopperProps extends MUIPopperProps {
  children?: React.ReactNode | React.ReactElement;
  onOpen?: () => void;
  onClose?: () => void;
  PaperProps?: MUIPaperProps & Record<string, unknown>;
}

export const Popper: React.FC<PopperProps> = React.forwardRef(
  (
    {
      open,
      children,
      onOpen = () => {},
      onClose = () => {},
      PaperProps,
      ...props
    },
    ref
  ) => {
    return (
      <MUIPopper {...props} open={open} transition>
        {({ TransitionProps }) => (
          <Fade
            {...TransitionProps}
            timeout={250}
            onEntered={onOpen}
            onExited={onClose}
            unmountOnExit
          >
            <MUIPaper {...PaperProps} ref={ref} elevation={1}>
              {children}
            </MUIPaper>
          </Fade>
        )}
      </MUIPopper>
    );
  }
);

Popper.displayName = "Popper";
Popper.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  PaperProps: PropTypes.any,
};

export default Popper;
