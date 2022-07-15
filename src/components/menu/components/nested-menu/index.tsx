import React from "react";
import MenuContext, {
  MenuContextType,
  MetadataProps,
} from "../../helpers/context.helper";
import MenuItem, { MenuItemProps } from "../item";
import MenuPopover from "../menu-popover";

export interface NestedMenuProps extends MenuItemProps, MetadataProps {}

export const NestedMenu: React.FC<NestedMenuProps> = ({
  __uuid,
  children,
  ...props
}) => {
  const ctx = React.useContext<MenuContextType>(MenuContext);
  const anchorRef = React.useRef<HTMLLIElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (ctx.collapse) {
      setAnchorEl(null);
      return;
    }

    if (!__uuid) return;

    if (!ctx.currentItemUUIDs.includes(__uuid)) {
      setAnchorEl(null);
      return;
    }

    if (
      ctx.currentItemUUIDs[ctx.currentItemUUIDs.length - 1] !== __uuid ||
      ctx.hovering
    )
      setAnchorEl(anchorRef.current);
    else setAnchorEl(null);
  }, [ctx, __uuid]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    setAnchorEl(e.currentTarget);

    if (!ctx.collapse) return;

    ctx.mutate({
      ...ctx,
      collapse: false,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);

    ctx.mutate({
      ...ctx,
      collapse: true,
      hovering: false,
      currentItemUUIDs: [],
    });
  };

  return (
    <>
      <MenuItem
        __uuid={__uuid}
        ref={anchorRef}
        onClick={handleClick}
        {...props}
      />
      <MenuPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {children}
      </MenuPopover>
    </>
  );
};

export default NestedMenu;
