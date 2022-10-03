export interface DOMEvents {
  // Clipboard Events
  onCopy?: (e: ClipboardEvent) => void;
  onCut?: (e: ClipboardEvent) => void;
  onPaste?: (e: ClipboardEvent) => void;

  // Composition Events
  onCompositionEnd?: (e: CompositionEvent) => void;
  onCompositionStart?: (e: CompositionEvent) => void;
  onCompositionUpdate?: (e: CompositionEvent) => void;

  // Form Events
  onInput?: (e: InputEvent) => void;
  onSubmit?: (e: SubmitEvent) => void;

  // Focus Events
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocusIn?: (e: FocusEvent) => void;
  onFocusOut?: (e: FocusEvent) => void;

  // Keyboard Events
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;

  // MouseEvents
  onAuxClick?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onContextMenu?: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
  onDrag?: (e: DragEvent) => void;
  onDragEnd?: (e: DragEvent) => void;
  onDragEnter?: (e: DragEvent) => void;
  onDragExit?: (e: DragEvent) => void;
  onDragLeave?: (e: DragEvent) => void;
  onDragOver?: (e: DragEvent) => void;
  onDragStart?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseOut?: (e: MouseEvent) => void;
  onMouseOver?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;

  // Touch Events
  onTouchCancel?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchStart?: (e: TouchEvent) => void;

  // Pointer Events
  onPointerDown?: (e: PointerEvent) => void;
  onPointerMove?: (e: PointerEvent) => void;
  onPointerUp?: (e: PointerEvent) => void;
  onPointerCancel?: (e: PointerEvent) => void;
  onPointerEnter?: (e: PointerEvent) => void;
  onPointerLeave?: (e: PointerEvent) => void;
  onPointerOver?: (e: PointerEvent) => void;
  onPointerOut?: (e: PointerEvent) => void;

  // Wheel Events
  onWheel?: (e: WheelEvent) => void;

  // Animation Events
  onAnimationStart?: (e: AnimationEvent) => void;
  onAnimationEnd?: (e: AnimationEvent) => void;
  onAnimationIteration?: (e: AnimationEvent) => void;

  // Transition Events
  onTransitionEnd?: (e: TransitionEvent) => void;
}
