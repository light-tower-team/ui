import React from "react";
import Button, { ButtonProps } from "../button";
import DropdownDivider from "./components/divider";
import DropdownFooter from "./components/footer";
import DropdownHeader from "./components/header";
import DropdownMenuItem from "./components/item";
import DropdownMenu from "./components/menu";
import DropdownSection from "./components/section";
import DropdownSubMenu from "./components/submenu";
import DropdownContext, {
  IDropdownContext,
  initialContext,
} from "./helpers/context";
import "./index.scss";

export interface DropdownProps extends ButtonProps {
  children?: React.ReactElement | React.ReactElement[];
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [ctx, setCtx] = React.useState<IDropdownContext>(initialContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const onToggleClickHandler = () => {
    ctx.mutate({ ...ctx, depth: 0 });
  };

  const onMenuBlurHandler = () => {
    ctx.mutate({ ...ctx, depth: -1 });
  };

  React.useEffect(
    () =>
      setCtx({
        ...initialContext,
        mutate: newCtx => setCtx(newCtx),
      }),
    []
  );

  const onMenuKeyDownHandler = (e: React.KeyboardEvent) => {
    if (
      ![
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
        "Escape",
      ].includes(e.code)
    )
      return;

    e.preventDefault();

    if (e.code === "Escape") {
      onMenuBlurHandler();
      return;
    }

    const currentMenu = document.querySelector(
      ".ui-dropdown-menu[data-depth='" + ctx.depth + "'][data-open=true]"
    );

    if (!currentMenu) return;

    if (e.code === "Enter") {
      const item: HTMLButtonElement | null = currentMenu.querySelector(
        ".ui-dropdown-menu-item--focused"
      );

      if (!item) return;

      if (item.getAttribute("data-submenu")) {
        item.setAttribute("data-open", "true");

        ctx.mutate({ ...ctx, depth: ctx.depth + 1 });
        return;
      }

      item.click();
      onMenuBlurHandler();
      return;
    }

    if (e.code === "ArrowRight") {
      const item = currentMenu.querySelector(
        ".ui-dropdown-menu-item--focused[data-submenu=true]"
      );

      if (!item) return;

      item.setAttribute("data-open", "true");

      ctx.mutate({ ...ctx, depth: ctx.depth + 1 });
      return;
    }

    if (e.code === "ArrowLeft") {
      if (ctx.depth - 1 < 0) {
        onMenuBlurHandler();
        return;
      }

      const prevDepth: number = ctx.depth - 1;
      const prevPopup = document.querySelector(
        ".ui-dropdown-menu[data-depth='" + prevDepth + "'][data-open=true]"
      );

      if (!prevPopup) return;

      const item = prevPopup.querySelector(
        ".ui-dropdown-menu-item--focused[data-submenu=true][data-open=true]"
      );

      if (!item) return;

      item.removeAttribute("data-open");

      ctx.mutate({ ...ctx, depth: ctx.depth - 1 });
      return;
    }

    const items = currentMenu.querySelectorAll(".ui-dropdown-menu-item");

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.classList.contains("ui-dropdown-menu-item--focused")) continue;

      item.classList.remove("ui-dropdown-menu-item--focused");

      let nextItem = null;

      if (e.code === "ArrowDown") {
        if (i + 1 < items.length) {
          nextItem = items[i + 1];
        } else {
          nextItem = items[0];
        }
        nextItem.scrollIntoView(false);
      } else if (e.code === "ArrowUp") {
        if (i - 1 >= 0) {
          nextItem = items[i - 1];
        } else {
          nextItem = items[items.length - 1];
        }
        nextItem.scrollIntoView();
      }

      nextItem?.classList.add("ui-dropdown-menu-item--focused");
      return;
    }

    if (!items.length) return;

    items.item(0).classList.add("ui-dropdown-menu-item--focused");
  };

  return (
    <DropdownContext.Provider value={ctx}>
      <Button
        ref={setAnchorEl}
        variant="outlined"
        onClick={onToggleClickHandler}
      >
        Dropdown
      </Button>
      <DropdownMenu
        open={ctx.depth >= 0}
        anchorEl={anchorEl}
        placement="bottom-start"
        FocusableBoxProps={{
          onKeyDown: onMenuKeyDownHandler,
          onBlur: onMenuBlurHandler,
        }}
      >
        {children}
      </DropdownMenu>
    </DropdownContext.Provider>
  );
};

export default Object.assign(Dropdown, {
  Item: DropdownMenuItem,
  Menu: DropdownMenu,
  SubMenu: DropdownSubMenu,
  Header: DropdownHeader,
  Footer: DropdownFooter,
  Divider: DropdownDivider,
  Section: DropdownSection,
});
