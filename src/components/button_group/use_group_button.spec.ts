import { defineComponent, ref } from "vue";
import { mount } from "@vue/test-utils";
import { faker } from "@faker-js/faker";
import { UseGroupButtonReturnValue, useGroupButton } from "./use_group_button";
import { BUTTON_GROUP, GROUP_BUTTON_PLACE } from "./constants";
import { GroupButton } from "./types";

describe("useGroupButton", () => {
  let group: GroupButton;

  let params: UseGroupButtonReturnValue;

  const mountGroupButton = (inButtonGroup = true) => {
    const TestButton = defineComponent({
      template: "<button>Test button</button>",
      setup() {
        params = useGroupButton();
      },
    });

    const wrapper = mount(TestButton, {
      global: {
        provide: inButtonGroup ? { [BUTTON_GROUP]: group } : undefined,
      },
    });

    return wrapper;
  };

  beforeEach(() => {
    group = {
      registerButton: vi.fn(),
      unregisterButton: vi.fn(),
      getButtonPlaceById: vi.fn(),
      groupOrientation: ref("horizontal"),
      color: ref("neutral"),
      variant: ref("outlined"),
      size: ref("md"),
    } satisfies GroupButton;
  });

  it("should return empty params if the button is not in the group", () => {
    mountGroupButton(false);

    expect(params).toEqual({});
  });

  it("should register a button", () => {
    mountGroupButton();

    expect(group.registerButton).toHaveBeenCalledOnce();
    expect(group.registerButton).toHaveBeenCalledWith();
  });

  it("should unregister a button when the button is unmounted", () => {
    const id = faker.string.uuid();

    vi.spyOn(group, "registerButton").mockReturnValueOnce(id);

    const wrapper = mountGroupButton();

    wrapper.unmount();

    expect(group.unregisterButton).toHaveBeenCalledOnce();
    expect(group.unregisterButton).toHaveBeenCalledWith(id);
  });

  it("should return 'groupPlace'", () => {
    const id = faker.string.uuid();
    const groupPlace: GROUP_BUTTON_PLACE = "first-and-last";

    vi.spyOn(group, "registerButton").mockReturnValueOnce(id);
    vi.spyOn(group, "getButtonPlaceById").mockReturnValueOnce(groupPlace);

    mountGroupButton();

    expect(params.groupPlace?.value).toEqual(groupPlace);

    expect(group.getButtonPlaceById).toHaveBeenCalledOnce();
    expect(group.getButtonPlaceById).toHaveBeenCalledWith(id);
  });

  it.each(["groupOrientation", "color", "size", "variant"] as const)("should return '%s'", (field) => {
    mountGroupButton();

    expect(params[field]?.value).toEqual(group[field].value);
  });
});
