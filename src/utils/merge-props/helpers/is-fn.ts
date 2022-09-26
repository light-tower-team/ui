/* eslint-disable @typescript-eslint/no-explicit-any */
export type FnArgs = any[];
export type Fn = (...args: FnArgs) => any;

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFn(maybeFn: unknown): maybeFn is Function {
  return typeof maybeFn === "function";
}

export default isFn;
