import React from "react";
import { Stack } from "@mui/material";
import LogoIcon from "../../assets/logo.svg";
import Typography from "../typography";
import "./index.scss";

export interface LogoProps {
  onlyIcon?: boolean;
  size?: "small" | "medium" | "large";
  flip?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  onlyIcon,
  size = "medium",
  flip,
}) => {
  return (
    <Stack
      direction={flip ? "row-reverse" : "row"}
      alignItems="center"
      className={["ui-logo", `ui-logo__size--${size}`].join(" ")}
    >
      <LogoIcon className="ui-logo__icon" />
      {!onlyIcon && (
        <Typography className="ui-logo__label">Light Tower</Typography>
      )}
    </Stack>
  );
};

export default Logo;
