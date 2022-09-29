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
  onFocusCapture?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onBlurCapture?: (e: FocusEvent) => void;

  // Keyboard Events
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyDownCapture?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onKeyUpCapture?: (e: KeyboardEvent) => void;

  // MouseEvents
  onAuxClick?: (e: MouseEvent) => void;
  onAuxClickCapture?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onClickCapture?: (e: MouseEvent) => void;
  onContextMenu?: (e: MouseEvent) => void;
  onContextMenuCapture?: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
  onDoubleClickCapture?: (e: MouseEvent) => void;
  onDrag?: (e: DragEvent) => void;
  onDragCapture?: (e: DragEvent) => void;
  onDragEnd?: (e: DragEvent) => void;
  onDragEndCapture?: (e: DragEvent) => void;
  onDragEnter?: (e: DragEvent) => void;
  onDragEnterCapture?: (e: DragEvent) => void;
  onDragExit?: (e: DragEvent) => void;
  onDragExitCapture?: (e: DragEvent) => void;
  onDragLeave?: (e: DragEvent) => void;
  onDragLeaveCapture?: (e: DragEvent) => void;
  onDragOver?: (e: DragEvent) => void;
  onDragOverCapture?: (e: DragEvent) => void;
  onDragStart?: (e: DragEvent) => void;
  onDragStartCapture?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent) => void;
  onDropCapture?: (e: DragEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseDownCapture?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseMoveCapture?: (e: MouseEvent) => void;
  onMouseOut?: (e: MouseEvent) => void;
  onMouseOutCapture?: (e: MouseEvent) => void;
  onMouseOver?: (e: MouseEvent) => void;
  onMouseOverCapture?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
  onMouseUpCapture?: (e: MouseEvent) => void;

  // Touch Events
  onTouchCancel?: (e: TouchEvent) => void;
  onTouchCancelCapture?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
  onTouchEndCapture?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchMoveCapture?: (e: TouchEvent) => void;
  onTouchStart?: (e: TouchEvent) => void;
  onTouchStartCapture?: (e: TouchEvent) => void;

  // Pointer Events
  onPointerDown?: (e: PointerEvent) => void;
  onPointerDownCapture?: (e: PointerEvent) => void;
  onPointerMove?: (e: PointerEvent) => void;
  onPointerMoveCapture?: (e: PointerEvent) => void;
  onPointerUp?: (e: PointerEvent) => void;
  onPointerUpCapture?: (e: PointerEvent) => void;
  onPointerCancel?: (e: PointerEvent) => void;
  onPointerCancelCapture?: (e: PointerEvent) => void;
  onPointerEnter?: (e: PointerEvent) => void;
  onPointerEnterCapture?: (e: PointerEvent) => void;
  onPointerLeave?: (e: PointerEvent) => void;
  onPointerLeaveCapture?: (e: PointerEvent) => void;
  onPointerOver?: (e: PointerEvent) => void;
  onPointerOverCapture?: (e: PointerEvent) => void;
  onPointerOut?: (e: PointerEvent) => void;
  onPointerOutCapture?: (e: PointerEvent) => void;
  onGotPointerCapture?: (e: PointerEvent) => void;
  onGotPointerCaptureCapture?: (e: PointerEvent) => void;
  onLostPointerCapture?: (e: PointerEvent) => void;
  onLostPointerCaptureCapture?: (e: PointerEvent) => void;

  // Wheel Events
  onWheel?: (e: WheelEvent) => void;
  onWheelCapture?: (e: WheelEvent) => void;

  // Animation Events
  onAnimationStart?: (e: AnimationEvent) => void;
  onAnimationStartCapture?: (e: AnimationEvent) => void;
  onAnimationEnd?: (e: AnimationEvent) => void;
  onAnimationEndCapture?: (e: AnimationEvent) => void;
  onAnimationIteration?: (e: AnimationEvent) => void;
  onAnimationIterationCapture?: (e: AnimationEvent) => void;

  // Transition Events
  onTransitionEnd?: (e: TransitionEvent) => void;
  onTransitionEndCapture?: (e: TransitionEvent) => void;
}
