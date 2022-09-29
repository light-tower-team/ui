export function isClientSide(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
}
