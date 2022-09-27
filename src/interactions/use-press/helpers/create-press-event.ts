import { PointerType } from "~/shared";

export type PressType =
  | "press"
  | "pressstart"
  | "pressend"
  | "pressup"
  | "presschange";

export interface EventBase<T> {
  currentTarget: T | null;
  pointerType: PointerType;
  target: EventTarget | null;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
}

export interface PressEvent<T extends HTMLElement = HTMLElement>
  extends EventBase<T> {
  type: PressType;
}

export interface BasePressEvent {
  target: EventTarget | null;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
}

export function createPressEvent<T extends HTMLElement>(
  e: BasePressEvent,
  currentTarget: T | null,
  pointerType: PointerType
): EventBase<T> {
  return {
    currentTarget,
    pointerType,
    target: e.target,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey,
  };
}
