import React from "react";
import PropTypes from "prop-types";

import MUITypography, {
  TypographyProps as MUITypographyProps,
} from "@mui/material/Typography";

export interface TypographyProps extends MUITypographyProps {
  component?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <MUITypography
      {...props}
      className={["ui-typography", props.className].join(" ")}
    >
      {children}
    </MUITypography>
  );
};

Typography.propTypes = {
  component: PropTypes.string,
};

export default Typography;
