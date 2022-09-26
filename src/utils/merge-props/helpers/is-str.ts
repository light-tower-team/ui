export function isStr(maybeStr: unknown): maybeStr is string {
  return typeof maybeStr === "string";
}

export default isStr;
