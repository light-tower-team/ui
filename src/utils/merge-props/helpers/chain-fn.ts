import isFn, { Fn, FnArgs } from "./is-fn";

export function chainIn<T extends Fn>(...callbacks: T[]): T {
  return ((...args: FnArgs) => {
    for (const callback of callbacks) {
      isFn(callback) && callback(...args);
    }
  }) as T;
}

export default chainIn;
