/* eslint-disable react/prop-types */
import React from "react";
import MUIPopper, { PopperProps as MUIPopperProps } from "@mui/material/Popper";
import MUIPaper, { PaperProps as MUIPaperProps } from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import ThemeContext, { ThemeContextType } from "../theme/context";
import Stack from "../stack";

export interface PopperProps extends MUIPopperProps {
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  PaperProps?: MUIPaperProps & Record<string, unknown>;
}

export const Popper: React.FC<PopperProps> = React.forwardRef(
  (
    {
      open,
      children,
      className,
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

/* import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
export interface PopperProps {
  open: boolean;
  anchorEl: HTMLElement;
  children?: React.ReactElement;
  placement?: Placement;
}

export const Popper: React.FC<PopperProps> = ({
  open,
  anchorEl,
  placement,
  children,
}) => {
  const [popperEl, setPopperEl] = React.useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(anchorEl, popperEl, {
    placement,
  });

  if (!open) return null;

  return (
    <Stack ref={setPopperEl} style={styles.popper} {...attributes.popper}>
      {children}
    </Stack>
  );
}; */

export default Popper;
