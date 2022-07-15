import React from "react";
import PropTypes from "prop-types";
import MUIMenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MenuContext, {
  MenuContextType,
  MetadataProps,
} from "../../helpers/context.helper";
import find from "../../helpers/find.helper";
import styles from "./index.module.scss";

export interface MenuItemProps
  extends React.HTMLAttributes<HTMLElement>,
    MetadataProps {
  text?: string;
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement | null;
  value?: string | number | readonly string[] | undefined | object;
  ref?: React.Ref<HTMLLIElement>;
}

export const MenuItem: React.FC<MenuItemProps> = React.forwardRef(
  (
    {
      __uuid,
      text,
      startIcon = null,
      endIcon = null,
      value,
      className,
      ...props
    },
    ref: React.Ref<HTMLLIElement>
  ) => {
    value; /// in order for the property not to be in dom

    const ctx = React.useContext<MenuContextType>(MenuContext);

    const isFocused = __uuid && ctx.currentItemUUIDs.includes(__uuid);

    const currentChild = find(ctx.items, __uuid ?? "");

    return (
      <MUIMenuItem
        ref={ref}
        className={[
          "ui-flex",
          className,
          isFocused ? "Mui-focusVisible" : "",
        ].join(" ")}
        {...props}
      >
        {startIcon ? (
          <ListItemIcon className={styles["ui-menu-item__start-icon"]}>
            {startIcon}
          </ListItemIcon>
        ) : null}
        <ListItemText>{text}</ListItemText>
        {currentChild?.__children.length ? (
          <ArrowRightIcon fontSize="small" />
        ) : null}
        {!currentChild?.__children.length ? (
          <ListItemIcon className={styles["ui-menu-item__end-icon"]}>
            {endIcon}
          </ListItemIcon>
        ) : null}
      </MUIMenuItem>
    );
  }
);

MenuItem.displayName = "MenuItem";
MenuItem.propTypes = {
  __uuid: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
};

export default MenuItem;
