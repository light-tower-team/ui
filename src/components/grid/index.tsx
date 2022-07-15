import React from "react";
import PropTypes from "prop-types";
import MUIGrid, { GridProps as MUIGridProps } from "@mui/material/Grid";

export type GridProps = MUIGridProps;

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ children = null, ...props }, ref: React.Ref<HTMLDivElement>) => {
    return (
      <MUIGrid ref={ref} {...props}>
        {children}
      </MUIGrid>
    );
  }
);

Grid.displayName = "Grid";
Grid.propTypes = {
  container: PropTypes.bool,
  item: PropTypes.bool,
};

export default Grid;
