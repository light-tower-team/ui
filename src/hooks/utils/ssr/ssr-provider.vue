<tempalte>
  <slot />
</tempalte>

<script setup lang="ts">
import { provide, inject } from "vue";
import { SSR_PROVIDER_KEY, defaultContext, SSRContextValue } from "../use-id";

let ctx = inject<SSRContextValue>(SSR_PROVIDER_KEY);

if (!ctx) {
  provide<SSRContextValue>(SSR_PROVIDER_KEY, defaultContext);

  ctx = defaultContext;
}

provide<SSRContextValue>(SSR_PROVIDER_KEY, {
  prefix: !ctx || ctx === defaultContext ? "" : `${ctx.prefix}-${++ctx.count}`,
  count: 0,
});
</script>
