import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { ref } from "vue";
import { useMockedConsole } from "../../utils/__tests__/use_mocked_console";
import { BUTTON_GROUP_ORIENTATION, GROUP_BUTTON_PLACE } from "../button_group";
import { UseGroupButtonReturnValue } from "../button_group/use_group_button";
import Button from "./button.vue";
import { BUTTON_VARIANT_CLASSES, BUTTON_VARIANTS, BUTTON_COLORS, BUTTON_SIZES } from "./constants";
import { buildButtonClasses } from "./utils/build_button_classes";

const useGroupButton = vi.hoisted(() => vi.fn<[], UseGroupButtonReturnValue>(() => ({})));

vi.mock("../button_group/use_group_button", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("../button_group/use_group_button")>()),
    useGroupButton,
  };
});

const BUTTON_VARIANTS_AND_COLORS = Object.entries(BUTTON_VARIANT_CLASSES).reduce<
  Array<{ variant: BUTTON_VARIANTS; color: BUTTON_COLORS }>
>((acc, [variant, colors]) => {
  Object.keys(colors).forEach((color) => {
    acc.push({
      variant: variant as BUTTON_VARIANTS,
      color: color as BUTTON_COLORS,
    });
  });

  return acc;
}, []);

function mountButton(options?: ComponentMountingOptions<typeof Button>, tag = "button") {
  const wrapper = mount(Button, options);

  const btn = wrapper.get(tag);

  return { btn, wrapper };
}

describe("button", () => {
  it("should have default structure and classes", () => {
    const { btn } = mountButton();

    expect(btn.classes().join(" ")).toEqual(buildButtonClasses());
    expect(btn.attributes("type")).toBe("button");
    expect(btn.attributes("href")).toBeUndefined();
    expect(btn.attributes("role")).toBeUndefined();
    expect(btn.attributes("disabled")).toBeUndefined();
    expect(btn.attributes("aria-disabled")).toBeUndefined();
    expect(btn.attributes("aria-label")).toBeUndefined();
    expect(btn.attributes("autocomplete")).toBeUndefined();
    expect(btn.attributes("tabindex")).toBeUndefined();
    expect(btn.attributes("data-pressed")).toBeUndefined();
  });

  it("should render default slot content", () => {
    const { btn } = mountButton({ slots: { default: "<span>content</span>" } });

    expect(btn.find("span").exists()).toBeTruthy();
    expect(btn.text()).toContain("content");
  });

  it.each(BUTTON_SIZES)("should apply a '%s' size class", (size) => {
    const { btn } = mountButton({ props: { size } });

    expect(btn.classes().join(" ")).toEqual(buildButtonClasses({ size }));
  });

  it.each(BUTTON_VARIANTS_AND_COLORS)(
    "should apply a $variant variant and $color color classes",
    ({ variant, color }) => {
      const { btn } = mountButton({ props: { variant, color } });

      expect(btn.classes().join(" ")).toEqual(buildButtonClasses({ variant, color }));
    },
  );

  it("should apply a 'fullWidth' class", () => {
    const { btn } = mountButton({ props: { fullWidth: true } });

    expect(btn.classes().join(" ")).toEqual(buildButtonClasses({ fullWidth: true }));
  });

  it("should apply a 'rounded' class", () => {
    const { btn } = mountButton({ props: { rounded: true } });

    expect(btn.classes().join(" ")).toEqual(buildButtonClasses({ rounded: true }));
  });

  it("has attribute 'disabled' when 'disabled' is set", () => {
    const { btn } = mountButton({ props: { disabled: true } });

    expect(btn.attributes("disabled")).toBeDefined();
    expect(btn.attributes("aria-disabled")).toBeUndefined();
  });

  it("has attribute 'aria-disabled' when 'disabled' and 'visuallyDisabled' are set", () => {
    const { btn } = mountButton({
      props: { disabled: true, visuallyDisabled: true },
    });

    expect(btn.attributes("disabled")).toBeUndefined();
    expect(btn.attributes("aria-disabled")).toEqual("true");
  });

  it.each(["focusin", "focusout", "mouseenter", "mouseleave"])(
    "should emit '%s' event when 'visuallyDisabled' is set",
    (event) => {
      const { btn, wrapper } = mountButton({
        props: { disabled: true, visuallyDisabled: true },
      });

      btn.trigger(event);

      expect(wrapper.emitted(event)).toHaveLength(1);
    },
  );

  it("should not emit 'click' event when 'visuallyDisabled' is set", async () => {
    const { btn, wrapper } = mountButton({
      props: { disabled: true, visuallyDisabled: true },
    });

    btn.trigger("click");

    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("should not emit click event when clicked and disabled", () => {
    const { btn, wrapper } = mountButton({ props: { disabled: true } });

    btn.trigger("click");

    expect(wrapper.emitted("click")).toBeUndefined();
  });

  describe("non-interactive root element", () => {
    it("should have default structure and classes", () => {
      const { btn } = mountButton({ props: { is: "span" } }, "span");

      expect(btn.classes().join(" ")).toEqual(buildButtonClasses());
      expect(btn.attributes("type")).toBeUndefined();
      expect(btn.attributes("href")).toBeUndefined();
      expect(btn.attributes("role")).toEqual("button");
      expect(btn.attributes("disabled")).toBeUndefined();
      expect(btn.attributes("aria-disabled")).toBeUndefined();
      expect(btn.attributes("aria-label")).toBeUndefined();
      expect(btn.attributes("autocomplete")).toBeUndefined();
      expect(btn.attributes("tabindex")).toEqual("0");
      expect(btn.attributes("data-pressed")).toBeUndefined();
    });

    it("has attribute 'disabled' when 'disabled' is set", () => {
      const { btn } = mountButton({ props: { is: "span", disabled: true } }, "span");

      expect(btn.classes().join(" ")).toEqual(buildButtonClasses());
      expect(btn.attributes("type")).toBeUndefined();
      expect(btn.attributes("href")).toBeUndefined();
      expect(btn.attributes("role")).toEqual("button");
      expect(btn.attributes("disabled")).toBeUndefined();
      expect(btn.attributes("aria-disabled")).toEqual("true");
      expect(btn.attributes("aria-label")).toBeUndefined();
      expect(btn.attributes("autocomplete")).toBeUndefined();
      expect(btn.attributes("tabindex")).toEqual("-1");
      expect(btn.attributes("data-pressed")).toBeUndefined();
    });
  });

  describe("link", () => {
    it("should render a link", () => {
      const { btn } = mountButton({ props: { href: "#" } }, "a");

      expect(btn.classes().join(" ")).toEqual(buildButtonClasses());
      expect(btn.attributes("href")).toEqual("#");
    });

    it("should have role='button'", () => {
      const { btn } = mountButton({ props: { href: "#" } }, "a");

      expect(btn.attributes("role")).toEqual("button");
    });

    it("should have tabindex='0'", () => {
      const { btn } = mountButton({ props: { href: "#" } }, "a");

      expect(btn.attributes("tabindex")).toEqual("0");
    });

    it("should emit click event when clicked", () => {
      const { btn, wrapper } = mountButton({ props: { href: "#" } }, "a");

      btn.trigger("click");

      expect(wrapper.emitted("click")).toHaveLength(1);
    });

    it("should treat keydown.enter event as click event", () => {
      const { btn, wrapper } = mountButton({ props: { href: "#" } }, "a");

      btn.trigger("keydown", { key: "Enter" });

      expect(wrapper.emitted("click")).toHaveLength(1);
    });

    it("should not treat keydown.enter event as click event when disabled", () => {
      const { btn, wrapper } = mountButton({ props: { href: "#", disabled: true } }, "a");

      btn.trigger("keydown", { key: "Enter" });

      expect(wrapper.emitted("click")).toBeUndefined();
    });

    it("should treat keyup.space event as click event", () => {
      const { btn, wrapper } = mountButton({ props: { href: "#" } }, "a");

      btn.trigger("keydown", { key: " " });
      btn.trigger("keyup", { key: " " });

      expect(wrapper.emitted("click")).toHaveLength(1);
    });

    it("should not treat keyup.space event as click event when disabled", () => {
      const { btn, wrapper } = mountButton({ props: { href: "#", disabled: true } }, "a");

      btn.trigger("keydown", { key: " " });
      btn.trigger("keyup", { key: " " });

      expect(wrapper.emitted("click")).toBeUndefined();
    });
  });

  it("should render a loading component", () => {
    const { btn } = mountButton({
      props: { loading: true },
    });

    expect(btn.find("span[role='status']").exists()).toBeTruthy();
  });

  describe("with icons", () => {
    useMockedConsole();

    it("should display warning when 'aria-label' is not set", () => {
      mountButton({ props: { leadingIcon: "star" } });

      expect(console.warn).toHaveBeenCalledOnce();
    });

    it("should render a leading icon", () => {
      const { btn } = mountButton({
        props: { leadingIcon: "star", ariaLabel: "favorite" },
      });

      expect(btn.find("svg[role='img']").exists()).toBeTruthy();
    });

    it("should render a trailing icon", () => {
      const { btn } = mountButton({
        props: { trailingIcon: "star", ariaLabel: "favorite" },
      });

      expect(btn.find("svg[role='img']").exists()).toBeTruthy();
    });

    it("should correctly detect empty content for icon only mode", () => {
      const wrapper = mount({
        components: { Button },
        template: `<Button leading-icon="star" aria-label="favorite"><slot><span v-if="false">not-rendered</span></slot></Button>`,
      });

      const btn = wrapper.get("button");

      expect(btn.classes().join(" ")).toContain(buildButtonClasses({ hasOnlyIcon: true }));
    });
  });

  describe("in a button group", () => {
    it.each<{ groupOrientation: BUTTON_GROUP_ORIENTATION; groupPlace: GROUP_BUTTON_PLACE }>([
      { groupOrientation: "horizontal", groupPlace: "first-and-last" },
      { groupOrientation: "horizontal", groupPlace: "first" },
      { groupOrientation: "horizontal", groupPlace: "middle" },
      { groupOrientation: "horizontal", groupPlace: "last" },
      { groupOrientation: "vertical", groupPlace: "first-and-last" },
      { groupOrientation: "vertical", groupPlace: "first" },
      { groupOrientation: "vertical", groupPlace: "middle" },
      { groupOrientation: "vertical", groupPlace: "last" },
    ])(
      "should apply group button styles when the group orientation is $groupOrientation and the button place is $groupPlace",
      ({ groupOrientation, groupPlace }) => {
        useGroupButton.mockReturnValueOnce({ groupOrientation: ref(groupOrientation), groupPlace: ref(groupPlace) });

        const { btn } = mountButton();

        expect(btn.classes().join(" ")).toEqual(buildButtonClasses({ groupOrientation, groupPlace }));
      },
    );

    it.each([
      { prop: "color", value: "danger" },
      { prop: "size", value: "xl" },
      { prop: "variant", value: "filled" },
    ])("should has the $value value of the $prop prop of the button group", ({ prop, value }) => {
      useGroupButton.mockReturnValueOnce({ [prop]: ref(value) });

      const { btn } = mountButton();

      expect(btn.classes().join(" ")).toEqual(buildButtonClasses({ [prop]: value }));
    });
  });
});
