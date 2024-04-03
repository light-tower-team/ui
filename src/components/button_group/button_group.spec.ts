import { mount } from "@vue/test-utils";
import ButtonGroup from "./button_group.vue";
import { buildButtonGroupClasses } from "./utils/build_button_group_classes";

describe("ButtonGroup", () => {
  it("should have default structure and classes", () => {
    const wrapper = mount(ButtonGroup);

    const group = wrapper.get("[role='group']");

    expect(group.classes().join(" ")).toEqual(buildButtonGroupClasses());
  });
});
