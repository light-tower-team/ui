import React from "react";
import Loading from "../loading";
import FocusableBox from "./components/focusable-box";
import HandleAttacher from "./components/handle-attacher";
import MenuPopover from "./components/menu-popover";
import attach from "./helpers/attach.helper";
import MenuContext, {
  initialCtx,
  MenuContextType,
  MenuItemType,
  MenuPlacement,
} from "./helpers/context.helper";
import keyPressHandler from "./helpers/key-press-handler.helper";

export interface MenuWithoutAnchorProps
  extends React.HTMLAttributes<HTMLElement> {
  placement?: MenuPlacement;
  loading?: boolean;
  selectFirstItem?: boolean;
  onOpen?: () => void;
  onClose?: (value: string | number | boolean | object | null) => void;
}

export interface MenuProps extends MenuWithoutAnchorProps {
  anchor: React.ReactElement;
}

export const Menu: React.FC<MenuProps> = ({
  anchor,
  children = null,
  placement = "right-start",
  loading = false,
  selectFirstItem = false,
  onOpen = () => {},
  onClose = () => {},
  ...props
}) => {
  const [ctx, setCtx] = React.useState<MenuContextType>(initialCtx);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!children) return;

    const items = attach(
      children as React.ReactElement,
      {} as MenuItemType,
      {}
    );

    setCtx({
      items,
      currentItemUUIDs: selectFirstItem ? [items[0].__uuid] : [],
      collapse: false,
      hovering: false,
      placement,
      mutate: (newCtx) => setCtx({ ...newCtx }),
    });
  }, [selectFirstItem, children, placement]);

  const openMenuHandler = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();

    setAnchorEl(e.currentTarget);

    onOpen();

    if (!ctx.collapse) return;

    ctx.mutate({
      ...ctx,
      collapse: false,
    });
  };

  const closeMenuHandler = (value: string | number | boolean | null) => {
    setAnchorEl(null);

    ctx.mutate({
      ...ctx,
      collapse: true,
      hovering: false,
      currentItemUUIDs: [],
    });

    onClose(value);
  };

  React.useEffect(() => {
    if (!ctx.collapse || !anchorEl) return;

    setAnchorEl(null);

    onClose(null);
  }, [ctx, anchorEl, onClose]);

  const ahr = React.cloneElement(anchor, {
    ...anchor.props,
    className: props.className,
    onClick: openMenuHandler,
  });

  return (
    <MenuContext.Provider value={ctx}>
      <FocusableBox
        onKeyDown={(e) => keyPressHandler(e, ctx, closeMenuHandler)}
      >
        {ahr}
      </FocusableBox>
      <MenuPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => closeMenuHandler(null)}
      >
        {loading ? (
          <Loading size={24} />
        ) : (
          <HandleAttacher onClick={closeMenuHandler}>
            {ctx.items}
          </HandleAttacher>
        )}
      </MenuPopover>
    </MenuContext.Provider>
  );
};

export default Menu;
