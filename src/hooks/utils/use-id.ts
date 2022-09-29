import { inject, provide } from "vue";
import { isClientSide } from "~/utils/is-client-side";

export const SSR_PROVIDER_KEY = "SSR_PROVIDER_KEY";

export interface SSRContextValue {
  prefix: string;
  count: number;
}

export const defaultContext: SSRContextValue = {
  prefix: String(Math.round(Math.random() * 10000000000)),
  count: 0,
};

/**
 *  If a default is not provided, generate an id.
 *
 *  When using ssr in a project, you must wrap the application in
 *  <ui-ssr-provider /> for id synchronization between the server and the client.
 *
 * @param defaultId - Default component id.
 */
export function useId(defaultId?: string): string {
  let ctx = inject<SSRContextValue>(SSR_PROVIDER_KEY) ?? defaultContext;

  if (!ctx) {
    provide<SSRContextValue>(SSR_PROVIDER_KEY, defaultContext);

    ctx = defaultContext;
  }

  if (ctx === defaultContext && !isClientSide()) {
    console.warn(
      "When server rendering, you must wrap your application in an <ui-ssr-provider> to ensure consistent ids are generated between the client and server."
    );
  }

  return defaultId ?? `x-id-${ctx.prefix}-${++ctx.count}`;
}
