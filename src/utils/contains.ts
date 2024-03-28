export function contains<TValue>(
  arr: ReadonlyArray<TValue>,
  value: unknown,
): value is TValue {
  return arr.some((val) => val === value);
}
