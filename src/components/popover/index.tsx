import React from "react";
import MUIPopper, { PopperProps as MUIPopperProps } from "@mui/material/Popper";
import MUIPaper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import ThemeContext, { ThemeContextType } from "../theme/context";

export interface PopoverProps extends MUIPopperProps {
  onClose?: () => void;
}

export const Popover: React.FC<PopoverProps> = ({
  open,
  children,
  onClose = () => {},
  ...props
}) => {
  const [error, setError] = React.useState<boolean>(false);
  const ctx = React.useContext<ThemeContextType>(ThemeContext);

  React.useEffect(() => {
    if (!open || error) return;

    const appRoot = document.getElementById(ctx.APP_ROOT_DIR);

    if (!appRoot) {
      console.error(
        "Was not found theme context. Please use theme provider as the root component in your app"
      );

      setError(true);
      return;
    }

    appRoot.addEventListener("click", onClose);

    return () => {
      appRoot.removeEventListener("click", onClose);
    };
  }, [open, onClose]);

  if (error) return null;

  return (
    <MUIPopper open={open} {...props}>
      <Fade in={open}>
        <MUIPaper elevation={1}>{children as any}</MUIPaper>
      </Fade>
    </MUIPopper>
  );
};

Popover.displayName = "Popover";

export default Popover;
