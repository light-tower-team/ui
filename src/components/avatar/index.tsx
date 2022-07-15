import React from "react";
import PropTypes from "prop-types";
import MUIAvatar, { AvatarProps as MUIAvatarProps } from "@mui/material/Avatar";
import Typography from "../typography";

export interface AvatarProps extends MUIAvatarProps {
  name: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  alt = "user avatar",
  size = 16,
  ...props
}) => {
  const firstNameLetter = () => {
    return name.length ? name[0].toUpperCase() : "";
  };

  return (
    <MUIAvatar
      alt={alt}
      variant="rounded"
      sx={{ width: size, height: size, fontSize: `${size / 40}rem` }}
      {...props}
    >
      <Typography variant="inherit">{firstNameLetter()}</Typography>
    </MUIAvatar>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.oneOf([16, 20, 24, 32, 40, 44, 48, 120]),
};

export default Avatar;
