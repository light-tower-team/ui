import React from "react";
import MenuContext, {
  MenuContextType,
  MenuItemType,
} from "../helpers/context.helper";
import MenuItem from "./item";

export interface HandleAttacherProps {
  children: MenuItemType[];
  onClick?: (value: any) => void;
}

export const HandleAttacher: React.FC<HandleAttacherProps> = ({
  children,
  onClick = () => {},
}): React.ReactElement => {
  const ctx = React.useContext<MenuContextType>(MenuContext);

  const attach = (children: MenuItemType[]) => {
    const c: React.ReactElement[] = [];

    for (const child of children) {
      c.push(
        React.cloneElement(child.__el, {
          ...child.__el.props,
          key: child.__el.key,
          children: attach(child.__children),
          onClick: () => {
            if (child.__el.type !== MenuItem) return;

            ctx.mutate({
              ...ctx,
              collapse: true,
              hovering: false,
              currentItemUUIDs: [],
            });

            onClick(child.__el.props.value);
          },
          onMouseEnter: () => {
            const nextChild = child;
            const nextParentChildren = nextChild.__parent.__children;
            const reserve = [...ctx.currentItemUUIDs];

            let done = false;

            for (let i = ctx.currentItemUUIDs.length - 1; i >= 0; --i) {
              if (
                nextParentChildren.find(
                  c => c.__uuid === ctx.currentItemUUIDs[i]
                )
              ) {
                ctx.currentItemUUIDs.pop();
                done = true;
                break;
              }

              ctx.currentItemUUIDs.pop();
            }

            if (!done) ctx.currentItemUUIDs.push(...reserve);

            ctx.currentItemUUIDs.push(nextChild.__uuid);
            ctx.hovering = true;

            ctx.mutate(ctx);
          },
        })
      );
    }

    return c;
  };

  return <>{attach(children)}</>;
};

export default HandleAttacher;
