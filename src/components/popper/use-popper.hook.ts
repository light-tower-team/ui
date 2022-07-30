import React from "react";

export type Viewport = Document;

export type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left-start"
  | "left"
  | "left-end"
  | "right-start"
  | "right"
  | "right-end";

type Translation = {
  x: number;
  y: number;
};

function translate(
  anchor: HTMLElement,
  popper: HTMLElement,
  placement: Placement
): Translation {
  switch (placement) {
    case "top-start": {
      return {
        x: anchor.offsetLeft,
        y: anchor.offsetTop - popper.offsetHeight,
      };
    }
    case "top": {
      return {
        x:
          anchor.offsetLeft -
          Math.abs(anchor.offsetWidth / 2 - popper.offsetWidth / 2),
        y: anchor.offsetTop - popper.offsetHeight,
      };
    }
    case "top-end": {
      return {
        x: anchor.offsetLeft + anchor.offsetWidth - popper.offsetWidth,
        y: anchor.offsetTop - popper.offsetHeight,
      };
    }
    case "bottom-start": {
      return {
        x: anchor.offsetLeft,
        y: anchor.offsetTop + anchor.offsetHeight,
      };
    }
    case "bottom": {
      return {
        x:
          anchor.offsetLeft -
          Math.abs(anchor.offsetWidth / 2 - popper.offsetWidth / 2),
        y: anchor.offsetTop + anchor.offsetHeight,
      };
    }
    case "bottom-end": {
      return {
        x: anchor.offsetLeft + anchor.offsetWidth - popper.offsetWidth,
        y: anchor.offsetTop + anchor.offsetHeight,
      };
    }
    case "left-start": {
      return {
        x: anchor.offsetLeft - popper.offsetWidth,
        y: anchor.offsetTop,
      };
    }
    case "left": {
      return {
        x: anchor.offsetLeft - popper.offsetWidth,
        y:
          anchor.offsetTop -
          Math.abs(anchor.offsetHeight / 2 - popper.offsetHeight / 2),
      };
    }
    case "left-end": {
      return {
        x: anchor.offsetLeft - popper.offsetWidth,
        y: anchor.offsetTop + anchor.offsetHeight - popper.offsetHeight,
      };
    }
    case "right-start": {
      return {
        x: anchor.offsetLeft + anchor.offsetWidth,
        y: anchor.offsetTop,
      };
    }
    case "right": {
      return {
        x: anchor.offsetLeft + anchor.offsetWidth,
        y:
          anchor.offsetTop -
          Math.abs(anchor.offsetHeight / 2 - popper.offsetHeight / 2),
      };
    }
    case "right-end": {
      return {
        x: anchor.offsetLeft + anchor.offsetWidth,
        y: anchor.offsetTop + anchor.offsetHeight - popper.offsetHeight,
      };
    }
  }
}

function optimize(
  placement: Placement,
  anchor: HTMLElement,
  popper: HTMLElement,
  viewport: Viewport
): Placement {
  const { x: preferPosX, y: preferPosY } = translate(anchor, popper, placement);

  const absX = preferPosX + popper.offsetWidth;
  const absY = preferPosY + popper.offsetHeight;

  let [dirX, dirY] = (placement as string).split("-"); /// 'right-start' => ['right', 'start']

  if (absX > viewport.body.offsetWidth || absX < 0) {
    if (dirX === "left") dirX = "right";
    if (dirX === "right") dirX = "left";
    if (dirY === "start") dirY = "end";
    if (dirY === "end") dirY = "start";
  }

  if (absY > viewport.body.offsetHeight || absY < 0) {
    if (dirX === "top") dirX = "bottom";
    if (dirX === "bottom") dirX = "top";
    if (dirY === "start") dirY = "end";
    if (dirY === "end") dirY = "start";
  }

  return `${dirX}-${dirY}` as Placement;
}

export interface PopperState {
  styles: {
    popper: React.CSSProperties;
  };
  attributes: {
    popper: Record<string, unknown>;
  };
}

export const usePopper = (
  anchor: HTMLElement | null,
  popper: HTMLElement | null,
  {
    placement = "bottom-start",
    viewport = document,
  }: {
    placement?: Placement;
    viewport?: Viewport;
  } = {}
): PopperState => {
  const [state, setState] = React.useState<PopperState>({
    styles: {
      popper: {
        position: "absolute",
        inset: "0px auto auto 0px",
        transform: "translate(0px, 0px)",
      },
    },
    attributes: {
      popper: {},
    },
  });

  React.useEffect(() => {
    const resize = () => {
      if (!anchor || !popper) return;

      const pos = translate(
        anchor,
        popper,
        optimize(placement, anchor, popper, viewport)
      );

      setState({
        ...state,
        styles: {
          ...state.styles,
          popper: {
            ...state.styles.popper,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          },
        },
      });
    };

    viewport.addEventListener("resize", resize);

    return () => {
      viewport.removeEventListener("resize", resize);
    };
  }, [anchor, popper, placement, viewport, state]);

  React.useLayoutEffect(() => {
    if (!anchor || !popper) return;

    const pos = translate(
      anchor,
      popper,
      optimize(placement, anchor, popper, viewport)
    );

    setState({
      ...state,
      styles: {
        ...state.styles,
        popper: {
          ...state.styles.popper,
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        },
      },
    });
  }, [anchor, popper, placement]);

  return state;
};

export default usePopper;
