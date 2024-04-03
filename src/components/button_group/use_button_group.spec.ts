import { UnwrapNestedRefs, reactive } from "vue";
import { BUTTON_GROUP, BUTTON_GROUP_ORIENTATION, DEFAULT_BUTTON_GROUP_ORIENTATION } from "./constants";
import { GroupButton } from "./types";
import { UseButtonGroupParams, useButtonGroup as _useButtonGroup } from "./use_button_group";
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  DEFAULT_BUTTON_COLOR,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
} from "../button";

const provide = vi.hoisted(() => vi.fn<[Symbol, GroupButton]>());

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    provide,
  };
});

describe("useButtonGroup", () => {
  let group: UnwrapNestedRefs<GroupButton>;

  const useButtonGroup = (params: Partial<UseButtonGroupParams> = {}) => {
    _useButtonGroup({
      orientation: DEFAULT_BUTTON_GROUP_ORIENTATION,
      color: DEFAULT_BUTTON_COLOR,
      size: DEFAULT_BUTTON_SIZE,
      variant: DEFAULT_BUTTON_VARIANT,
      ...params,
    });

    group = reactive(provide.mock.calls[0][1]);
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should have default structure", () => {
    useButtonGroup();

    expect(provide).toHaveBeenCalledOnce();

    const key = provide.mock.calls[0][0];

    expect(key).toEqual(BUTTON_GROUP);
    expect(group.registerButton).toBeInstanceOf(Function);
    expect(group.unregisterButton).toBeInstanceOf(Function);
    expect(group.getButtonPlaceById).toBeInstanceOf(Function);
    expect(group.groupOrientation).toEqual(DEFAULT_BUTTON_GROUP_ORIENTATION);
    expect(group.color).toEqual(DEFAULT_BUTTON_COLOR);
    expect(group.size).toEqual(DEFAULT_BUTTON_SIZE);
    expect(group.variant).toEqual(DEFAULT_BUTTON_VARIANT);
  });

  it.each(BUTTON_GROUP_ORIENTATION)("should provide the '%s' group orientation", (orientation) => {
    useButtonGroup({ orientation });

    expect(group.groupOrientation).toEqual(orientation);
  });

  it.each(BUTTON_COLORS)("should provide the '%s' button color", (color) => {
    useButtonGroup({ color });

    expect(group.color).toEqual(color);
  });

  it.each(BUTTON_SIZES)("should provide the '%s' button size", (size) => {
    useButtonGroup({ size });

    expect(group.size).toEqual(size);
  });

  it.each(BUTTON_VARIANTS)("should provide the '%s' button variant", (variant) => {
    useButtonGroup({ variant });

    expect(group.variant).toEqual(variant);
  });

  it("should register and unregister a button", () => {
    useButtonGroup();

    const { registerButton, unregisterButton, getButtonPlaceById } = group;

    const [btn1] = [registerButton(), registerButton(), registerButton()];

    expect(getButtonPlaceById(btn1)).toEqual("first");

    expect(unregisterButton(btn1)).toBeTruthy();

    expect(getButtonPlaceById(btn1)).toBeUndefined();
  });

  it.each([
    { buttons: 0, places: [] },
    { buttons: 1, places: ["first-and-last"] },
    { buttons: 2, places: ["first", "last"] },
    { buttons: 3, places: ["first", "middle", "last"] },
    { buttons: 4, places: ["first", "middle", "middle", "last"] },
  ])("should have $places button places", ({ buttons, places }) => {
    useButtonGroup();

    expect(provide).toHaveBeenCalled();

    const { registerButton, getButtonPlaceById } = group;

    const currentPlaces = Array.from({ length: buttons }, registerButton).map(getButtonPlaceById).filter(Boolean);

    expect(currentPlaces).toEqual(places);
  });

  it("should not unregister the button if it doesn't exist", () => {
    useButtonGroup();

    const { unregisterButton } = group;

    expect(unregisterButton("unknown")).toBeFalsy();
  });
});
