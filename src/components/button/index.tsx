import React from "react";
import PropTypes from "prop-types";
import MUIButton, { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import Typography from "../typography";
import Loading from "../loading";

export type VariantButton = "text" | "outlined" | "contained";

export interface ButtonProps extends MUIButtonProps {
  children?: string;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children = null,
      variant = "contained",
      startIcon = null,
      endIcon = null,
      loading = false,
      className = "",
      size = "medium",
      disabled = false,
      ...props
    },
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const isIconBtn = startIcon && !children;

    return (
      <MUIButton
        ref={ref}
        size={size}
        variant={variant}
        startIcon={loading ? <Loading /> : startIcon}
        endIcon={isIconBtn ? null : endIcon}
        className={[
          "ui-button",
          loading ? "ui-button--loading" : "",
          isIconBtn ? "ui-button__icon" : "",
          className,
        ].join(" ")}
        disabled={disabled || loading}
        {...props}
      >
        <Typography variant="button" component="span">
          {children}
        </Typography>
      </MUIButton>
    );
  }
);

Button.displayName = "Button";
Button.propTypes = {
  children: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
