import React from "react";
import PropTypes from "prop-types";
import MUIButton, { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import Typography from "../typography";
import Loading from "../loading";
import "./index.scss";

export interface ButtonProps extends MUIButtonProps {
  color?: "neutral" | "primary"; // for correct display in the storybook
  loading?: boolean;
  rounded?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      startIcon,
      endIcon,
      loading,
      className,
      disabled,
      rounded,
      ...props
    },
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const isIconBtn = startIcon && !children;

    return (
      <MUIButton
        ref={ref}
        startIcon={loading ? <Loading /> : startIcon}
        endIcon={isIconBtn ? null : endIcon}
        className={[
          "ui-button",
          loading ? "ui-button--loading" : "",
          rounded ? "ui-button--rounded" : "",
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
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  color: PropTypes.oneOf(["neutral", "primary"]),
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
};

export default Button;
