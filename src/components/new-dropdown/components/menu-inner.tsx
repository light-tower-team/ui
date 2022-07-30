/* eslint-disable react/prop-types */
import React from "react";
import Stack, { StackProps } from "../../stack";
import DropdownContext, { useDropdownContext } from "../helpers/context";
import DropdownFooter from "./footer";
import DropdownHeader from "./header";
import PropTypes from "prop-types";

const find = (
  children: React.ReactElement | React.ReactElement[],
  type: string | React.JSXElementConstructor<any>
) => {
  const c = Array.isArray(children) ? children : [children];

  for (const child of c) {
    if (child.type === type) return child;
  }
};

const filter = (
  children: React.ReactElement | React.ReactElement[],
  types: (string | React.JSXElementConstructor<any>)[]
): React.ReactElement[] => {
  const c = Array.isArray(children) ? children : [children];
  const elements: React.ReactElement[] = [];

  for (const child of c) {
    if (types.includes(child.type)) continue;

    elements.push(child);
  }

  return elements;
};

export interface DropdownMenuInnerProps {
  children?: any;
}

export const DropdownMenuInner: React.FC<DropdownMenuInnerProps> =
  React.forwardRef(({ children, ...props }, ref) => {
    const { ctx, close } = useDropdownContext();

    React.useLayoutEffect(() => {
      const items = document.querySelectorAll(".ui-dropdown-menu-item");

      const onClick = close;

      const onMouseEnter = (e: Event) => {
        const currentElement = e.currentTarget as HTMLElement;
        const currentMenuContent = currentElement?.parentElement;
        const currentMenuInner = currentMenuContent?.parentElement;
        const currentMenu = currentMenuInner?.parentElement;

        if (!currentMenu) return;

        const items = currentMenu.querySelectorAll(".ui-dropdown-menu-item");

        for (const item of items) {
          if (item === e.currentTarget) continue;

          item.classList.remove("ui-dropdown-menu-item--focused");

          if (item.getAttribute("data-open")) {
            item.removeAttribute("data-open");
            ctx.mutate({ ...ctx, depth: ctx.depth - 1 });
          }
        }

        if (currentElement.classList.contains("ui-dropdown-menu-item--focused"))
          return;

        currentElement.classList.add("ui-dropdown-menu-item--focused");

        if (currentElement.getAttribute("data-submenu")) {
          currentElement.setAttribute("data-open", "true");
          ctx.mutate({ ...ctx, depth: ctx.depth + 1 });
        }
      };

      for (const item of items) {
        item.addEventListener("click", onClick);
        item.addEventListener("mouseenter", onMouseEnter);
      }

      return () => {
        for (const item of items) {
          item.removeEventListener("click", onClick);
          item.removeEventListener("mouseenter", onMouseEnter);
        }
      };
    }, [ctx]);

    if (!children) return null;

    return (
      <Stack {...props} ref={ref} className="ui-dropdown-menu-inner">
        <Stack className="ui-dropdown-header">
          {find(children, DropdownHeader)}
        </Stack>
        <Stack className="ui-dropdown-content">
          {filter(children, [DropdownHeader, DropdownFooter])}
        </Stack>
        <Stack className="ui-dropdown-footer">
          {find(children, DropdownFooter)}
        </Stack>
      </Stack>
    );
  });

DropdownMenuInner.displayName = "DropdownMenuInner";
/* DropdownMenuInner.propTypes = {
  children: PropTypes.element,
}; */

export default DropdownMenuInner;
