import { computed, Ref, ref, UnwrapRef } from "vue";

export function useValueRef<T>(initialValue: T): Ref<UnwrapRef<T>>;
export function useValueRef<T = undefined>(): Ref<UnwrapRef<T | undefined>>;

export function useValueRef<T = undefined>(
  initialValue?: T
): Ref<UnwrapRef<T | undefined>> {
  return ref<T | undefined>(initialValue);
}

export function useComponentRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends abstract new (...args: any[]) => any,
  H extends HTMLElement = HTMLElement
>(): [Ref<UnwrapRef<T | null>>, Ref<UnwrapRef<H | null>>] {
  const componentRef = ref<InstanceType<T> | null>(null);
  const elementRef = computed(() => componentRef.value?.$el);

  return [componentRef, elementRef];
}
