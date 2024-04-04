import { mount } from "@vue/test-utils";
import { DEFAULT_TYPOGRAPHY_ELEMENT, TYPOGRAPHY_COLORS, TYPOGRAPHY_VARIANTS } from "./constants";
import Typography from "./typography.vue";
import { buildTypographyClasses } from "./utils/build_typography_classes";

const TYPOGRAPHY_VARIANTS_AND_COLORS = TYPOGRAPHY_VARIANTS.reduce<
  { variant: TYPOGRAPHY_VARIANTS; color: TYPOGRAPHY_COLORS }[]
>((acc, variant) => {
  TYPOGRAPHY_COLORS.forEach((color) => acc.push({ variant, color }));

  return acc;
}, []);

describe("Typography", () => {
  it("should have default structure", () => {
    const wrapper = mount(Typography);

    const el = wrapper.get(DEFAULT_TYPOGRAPHY_ELEMENT);

    expect(el.classes().join(" ")).toEqual(buildTypographyClasses());
  });

  it.each(TYPOGRAPHY_VARIANTS_AND_COLORS)("should have $variant variant and $color color", ({ variant, color }) => {
    const wrapper = mount(Typography, {
      props: {
        variant,
        color,
      },
    });

    const el = wrapper.get(DEFAULT_TYPOGRAPHY_ELEMENT);

    expect(el.classes().join(" ")).toEqual(buildTypographyClasses({ variant, color }));
  });

  it("should have 'truncate' class when truncate is set", () => {
    const wrapper = mount(Typography, {
      props: {
        truncate: true,
      },
    });

    const el = wrapper.get(DEFAULT_TYPOGRAPHY_ELEMENT);

    expect(el.classes().join(" ")).toEqual(buildTypographyClasses({ truncate: true }));
  });

  it.each(["h1", "h2", "h3", "h4", "h5", "h6", "div", "p", "span"] as const)("should have '%s' element", (is) => {
    const wrapper = mount(Typography, {
      props: {
        is,
      },
    });

    expect(wrapper.find(is).exists).toBeTruthy();
  });
});
