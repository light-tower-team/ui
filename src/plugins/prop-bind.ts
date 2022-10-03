import { App } from "vue";
import { HTMLAttributes } from "~/shared/dom";

function setObjectProps<T extends object, P extends object>(
  obj: T,
  props: P
): void {
  for (const [key, val] of Object.entries(props)) {
    if (!val) continue;

    obj[key] = val;
  }
}

export const PropBindPlugin = {
  install: (app: App) => {
    app.directive("props", {
      mounted(
        el: HTMLElement,
        binding: {
          value: Record<
            string,
            | HTMLAttributes
            | string
            | boolean
            | number
            | EventListenerOrEventListenerObject
          >;
        }
      ) {
        for (const [key, val] of Object.entries(binding.value)) {
          if (/^on[A-Z]/.test(key)) {
            const eventKey = key.slice(2).toLowerCase(); /// onMouseEnter -> mouseenter
            el.addEventListener(
              eventKey,
              val as EventListenerOrEventListenerObject
            );

            continue;
          }

          if (!el[key]) continue;

          if (typeof val === "object") {
            setObjectProps(el[key], val);

            continue;
          }

          el[key] = val;
        }
      },
      updated(
        el: HTMLElement,
        binding: {
          value: Record<
            string,
            | HTMLAttributes
            | string
            | boolean
            | number
            | EventListenerOrEventListenerObject
          >;
          oldValue: Record<
            string,
            | HTMLAttributes
            | string
            | boolean
            | number
            | EventListenerOrEventListenerObject
          >;
        }
      ) {
        for (const [key, val] of Object.entries(binding.value)) {
          if (/^on[A-Z]/.test(key)) {
            const eventKey = key.slice(2).toLowerCase(); /// onMouseEnter -> mouseenter
            el.removeEventListener(
              eventKey,
              binding.oldValue[key] as EventListenerOrEventListenerObject
            );
            el.addEventListener(
              eventKey,
              val as EventListenerOrEventListenerObject
            );

            continue;
          }

          if (!el[key]) continue;

          if (typeof val === "object") {
            setObjectProps(el[key], val);

            continue;
          }

          el[key] = val;
        }
      },
      unmounted(
        el: HTMLElement,
        binding: {
          value: Record<string, HTMLAttributes | string | boolean | number>;
        }
      ) {
        for (const [key, val] of Object.entries(binding.value)) {
          if (!/^on[A-Z]/.test(key)) continue;

          const eventKey = key.slice(2).toLowerCase(); /// onMouseEnter -> mouseenter

          el.removeEventListener(
            eventKey,
            val as EventListenerOrEventListenerObject
          );
        }
      },
    });
  },
};

export default PropBindPlugin;
