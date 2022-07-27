import React from "react";
import * as uuid from "uuid";
import { MenuItemType } from "./context.helper";

export default function attach(
  children: React.ReactElement | React.ReactElement[] | undefined,
  parent: MenuItemType,
  props: {
    onClick?: (e: React.MouseEvent, uuid: string) => void;
    onMouseEnter?: (e: React.MouseEvent, uuid: string) => void;
    onMouseLeave?: (e: React.MouseEvent, uuid: string) => void;
  }
): MenuItemType[] {
  if (!children) return [];

  const chn = Array.isArray(children) ? children : [children];
  const newChildren: MenuItemType[] = [];

  for (const oldChild of chn) {
    const newChild: MenuItemType = {
      __uuid: uuid.v4(),
      __parent: parent,
      __children: [],
      __el: oldChild,
    };

    newChild.__children = attach(oldChild.props?.children, newChild, props);

    newChild.__el = React.cloneElement(oldChild, {
      ...oldChild?.props,
      ...props,
      __uuid: newChild.__uuid,
      key: newChild.__uuid,
      children: newChild.__children.map(c => c.__el),
      onClick: (e: React.MouseEvent<HTMLElement>) =>
        props?.onClick && props?.onClick(e, newChild.__uuid),
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
        props?.onMouseEnter && props?.onMouseEnter(e, newChild.__uuid),
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
        props?.onMouseLeave && props?.onMouseLeave(e, newChild.__uuid),
    });

    newChildren.push(newChild);
  }

  parent.__children = newChildren;

  return newChildren;
}
