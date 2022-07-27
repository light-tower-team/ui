import React from "react";
import PropTypes from "prop-types";
import MUIAvatar, { AvatarProps as MUIAvatarProps } from "@mui/material/Avatar";
import Typography from "../typography";
import "./index.scss";

export interface AvatarProps extends MUIAvatarProps {
  name: string;
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  rounded?: boolean;
  color?: "neutral" | "primary" | "secondary";
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  alt = "The user avatar",
  size = "medium",
  color = "neutral",
  className,
  rounded,
  ...props
}) => {
  const firstNameLetter = () => {
    return name.length ? name[0].toUpperCase() : "";
  };

  return (
    <MUIAvatar
      {...props}
      alt={alt}
      variant="rounded"
      className={[
        "ui-avatar",
        `ui-avatar__size--${size}`,
        `ui-avatar__color--${color}`,
        rounded && "ui-avatar--rounded",
        className,
      ].join(" ")}
    >
      <Typography>{firstNameLetter()}</Typography>
    </MUIAvatar>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  color: PropTypes.oneOf(["neutral", "primary", "secondary"]),
};

export default Avatar;
