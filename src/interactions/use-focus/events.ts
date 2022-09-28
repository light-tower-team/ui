export class SyntheticFocusEvent implements FocusEvent {
  nativeEvent: FocusEvent;
  target: Element;
  currentTarget: Element;
  relatedTarget: Element;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  timeStamp: number;
  type: string;
  detail: number;
  view: Window | null;
  which: number;
  cancelBubble: boolean;
  composed: boolean;
  returnValue: boolean;
  srcElement: EventTarget | null;
  AT_TARGET: number;
  BUBBLING_PHASE: number;
  CAPTURING_PHASE: number;
  NONE: number;
  isFocused: boolean;

  constructor(
    type: string,
    nativeEvent: FocusEvent,
    options: { isFocused?: boolean } = {}
  ) {
    this.isFocused = options?.isFocused ?? false;
    this.nativeEvent = nativeEvent;
    this.target = nativeEvent.target as Element;
    this.currentTarget = nativeEvent.currentTarget as Element;
    this.relatedTarget = nativeEvent.relatedTarget as Element;
    this.bubbles = nativeEvent.bubbles;
    this.cancelable = nativeEvent.cancelable;
    this.defaultPrevented = nativeEvent.defaultPrevented;
    this.eventPhase = nativeEvent.eventPhase;
    this.isTrusted = nativeEvent.isTrusted;
    this.timeStamp = nativeEvent.timeStamp;
    this.type = type;
    this.detail = nativeEvent.detail;
    this.view = nativeEvent.view;
    this.cancelBubble = nativeEvent.cancelBubble;
    this.composed = nativeEvent.composed;
    this.which = nativeEvent.which;
    this.returnValue = nativeEvent.returnValue;
    this.srcElement = nativeEvent.srcElement;
    this.AT_TARGET = nativeEvent.AT_TARGET;
    this.BUBBLING_PHASE = nativeEvent.BUBBLING_PHASE;
    this.CAPTURING_PHASE = nativeEvent.CAPTURING_PHASE;
    this.NONE = nativeEvent.NONE;
  }

  initUIEvent(): void {
    throw new Error("Method not implemented.");
  }
  composedPath(): EventTarget[] {
    throw new Error("Method not implemented.");
  }
  initEvent(): void {
    throw new Error("Method not implemented.");
  }
  stopImmediatePropagation(): void {
    throw new Error("Method not implemented.");
  }

  isDefaultPrevented(): boolean {
    return this.nativeEvent.defaultPrevented;
  }

  preventDefault(): void {
    this.defaultPrevented = true;
    this.nativeEvent.preventDefault();
  }

  stopPropagation(): void {
    this.nativeEvent.stopPropagation();
    this.isPropagationStopped = () => true;
  }

  isPropagationStopped(): boolean {
    return false;
  }

  persist() {}
}

export class SyntheticFocusWithinEvent implements FocusEvent {
  nativeEvent: FocusEvent;
  target: Element;
  currentTarget: Element;
  relatedTarget: Element;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  timeStamp: number;
  type: string;
  detail: number;
  view: Window | null;
  which: number;
  cancelBubble: boolean;
  composed: boolean;
  returnValue: boolean;
  srcElement: EventTarget | null;
  AT_TARGET: number;
  BUBBLING_PHASE: number;
  CAPTURING_PHASE: number;
  NONE: number;
  isFocused: boolean;

  constructor(
    type: string,
    nativeEvent: FocusEvent,
    options: { isFocused?: boolean } = {}
  ) {
    this.isFocused = options?.isFocused ?? false;
    this.nativeEvent = nativeEvent;
    this.target = nativeEvent.target as Element;
    this.currentTarget = nativeEvent.currentTarget as Element;
    this.relatedTarget = nativeEvent.relatedTarget as Element;
    this.bubbles = nativeEvent.bubbles;
    this.cancelable = nativeEvent.cancelable;
    this.defaultPrevented = nativeEvent.defaultPrevented;
    this.eventPhase = nativeEvent.eventPhase;
    this.isTrusted = nativeEvent.isTrusted;
    this.timeStamp = nativeEvent.timeStamp;
    this.type = type;
    this.detail = nativeEvent.detail;
    this.view = nativeEvent.view;
    this.cancelBubble = nativeEvent.cancelBubble;
    this.composed = nativeEvent.composed;
    this.which = nativeEvent.which;
    this.returnValue = nativeEvent.returnValue;
    this.srcElement = nativeEvent.srcElement;
    this.AT_TARGET = nativeEvent.AT_TARGET;
    this.BUBBLING_PHASE = nativeEvent.BUBBLING_PHASE;
    this.CAPTURING_PHASE = nativeEvent.CAPTURING_PHASE;
    this.NONE = nativeEvent.NONE;
  }

  initUIEvent(): void {
    throw new Error("Method not implemented.");
  }
  composedPath(): EventTarget[] {
    throw new Error("Method not implemented.");
  }
  initEvent(): void {
    throw new Error("Method not implemented.");
  }
  stopImmediatePropagation(): void {
    throw new Error("Method not implemented.");
  }

  isDefaultPrevented(): boolean {
    return this.nativeEvent.defaultPrevented;
  }

  preventDefault(): void {
    this.defaultPrevented = true;
    this.nativeEvent.preventDefault();
  }

  stopPropagation(): void {
    this.nativeEvent.stopPropagation();
    this.isPropagationStopped = () => true;
  }

  isPropagationStopped(): boolean {
    return false;
  }

  persist() {}
}
