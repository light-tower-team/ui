let counter = 0;

export function useId(): string {
  return `__id_${counter++}`;
}
