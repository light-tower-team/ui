export type FnArgs = any[];
export type Fn = (...args: FnArgs) => any;

export function isFn(maybeFn: unknown): maybeFn is Function {
  return typeof maybeFn === "function";
}

export default isFn;
