import clsx from "clsx";
import { TupleTypes, UnionToIntersection } from "./types";
import isFn from "./helpers/is-fn";
import chainFn from "./helpers/chain-fn";
import isStr from "./helpers/is-str";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function mergeProps<T extends Props[]>(
  ...args: T
): UnionToIntersection<TupleTypes<T>> {
  const result: Props = {};

  for (const props of args) {
    for (const key of Object.keys(props)) {
      const prop = props[key];
      const existProp = result[key];

      if (/^on[A-Z]/.test(key) && isFn(prop) && isFn(existProp)) {
        result[key] = chainFn(existProp, prop);
      } else if (key === "aria-labelledby" && prop && existProp) {
        const currentPropValues = (existProp as string).split(" ");
        if (!currentPropValues.includes(prop)) {
          currentPropValues.push(prop);
        }
        result[key] = currentPropValues.join(" ");
      } else if (key === "className" && isStr(prop) && isStr(existProp)) {
        result[key] = clsx(existProp, prop);
      } else {
        result[key] = prop !== undefined ? prop : existProp;
      }
    }
  }

  return result as UnionToIntersection<TupleTypes<T>>;
}
