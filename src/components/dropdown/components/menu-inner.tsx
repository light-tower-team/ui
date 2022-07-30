import React from "react";
import PropTypes from "prop-types";
import Stack from "../../stack";
import { useDropdownContext } from "../helpers/context";
import DropdownFooter from "./footer";
import DropdownHeader from "./header";
import Loading from "../../loading";

const find = (
  children: React.ReactElement | React.ReactElement[],
  type: string | React.JSXElementConstructor<never>
) => {
  const c = Array.isArray(children) ? children : [children];

  for (const child of c) {
    if (child.type === type) return child;
  }
};

const filter = (
  children: React.ReactElement | React.ReactElement[],
  types: (string | React.JSXElementConstructor<never>)[]
): React.ReactElement[] => {
  const c = Array.isArray(children) ? children : [children];
  const elements: React.ReactElement[] = [];

  for (const child of c) {
    if (types.includes(child.type)) continue;

    elements.push(child);
  }

  return elements;
};

export type DynamicSubMenuFunc = () => Promise<
  React.ReactElement | React.ReactElement[]
>;

export interface DropdownMenuInnerProps {
  children?: React.ReactElement | React.ReactElement[] | DynamicSubMenuFunc;
}

export const DropdownMenuInner: React.FC<DropdownMenuInnerProps> =
  React.forwardRef(({ children, ...props }, ref) => {
    const { ctx, close } = useDropdownContext();
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [content, setContant] = React.useState<
      React.ReactElement | React.ReactElement[]
    >([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useLayoutEffect(() => {
      if (!children) return;

      if (typeof children === "function") {
        setLoading(true);

        children()
          .then(c => setContant(c))
          .finally(() => setLoading(false));

        return;
      }

      setContant(children);
    }, [children]);

    React.useLayoutEffect(() => {
      const menuInner = contentRef.current?.parentElement;

      if (!menuInner) return;

      const items = menuInner.querySelectorAll(".ui-dropdown-menu-item") ?? [];

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

      const currentMenu = menuInner?.parentElement;

      if (
        currentMenu &&
        !currentMenu.querySelector(".ui-dropdown-menu-item--focused")
      ) {
        const items = currentMenu.querySelectorAll(".ui-dropdown-menu-item");

        if (items.length) {
          items.item(0).classList.add("ui-dropdown-menu-item--focused");
        }
      }

      return () => {
        for (const item of items) {
          item.removeEventListener("click", onClick);
          item.removeEventListener("mouseenter", onMouseEnter);
        }
      };
    }, [ctx, content]);

    return (
      <Stack {...props} ref={ref} className="ui-dropdown-menu-inner">
        {loading ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            className="ui-h-full"
          >
            <Loading />
          </Stack>
        ) : (
          <>
            <Stack className="ui-dropdown-header">
              {find(content, DropdownHeader)}
            </Stack>
            <Stack ref={contentRef} className="ui-dropdown-content">
              {filter(content, [DropdownHeader, DropdownFooter])}
            </Stack>
            <Stack className="ui-dropdown-footer">
              {find(content, DropdownFooter)}
            </Stack>
          </>
        )}
      </Stack>
    );
  });

DropdownMenuInner.displayName = "DropdownMenuInner";
DropdownMenuInner.propTypes = {
  children: PropTypes.array,
};

export default DropdownMenuInner;
