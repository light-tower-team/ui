import { MenuContextType } from "./context.helper";
import find from "./find.helper";

export default function keyPressHandler(
  e: React.KeyboardEvent<HTMLElement>,
  ctx: MenuContextType,
  callback: (value: any) => void = () => {}
) {
  if (!ctx.items.length) return;

  switch (e.code) {
    case "ArrowDown": {
      e.preventDefault();

      if (!ctx.currentItemUUIDs.length) {
        const firstChild = ctx.items[0];

        ctx.currentItemUUIDs.push(firstChild.__uuid);

        ctx.mutate(ctx);

        return;
      }

      const currentChild = find(
        ctx.items,
        ctx.currentItemUUIDs[ctx.currentItemUUIDs.length - 1]
      );

      if (!currentChild) return;

      if (!currentChild.__parent) return;

      const parentChildren = currentChild.__parent.__children;

      for (let i = 0; i < parentChildren.length; ++i) {
        if (parentChildren[i].__uuid !== currentChild.__uuid) continue;

        if (i + 1 > parentChildren.length - 1) break;

        const nextChild = parentChildren[i + 1];

        ctx.currentItemUUIDs.pop();
        ctx.currentItemUUIDs.push(nextChild.__uuid);

        ctx.mutate(ctx);

        break;
      }

      break;
    }
    case "ArrowUp": {
      e.preventDefault();

      if (!ctx.currentItemUUIDs.length) {
        const firstChild = ctx.items[0];

        ctx.currentItemUUIDs.push(firstChild.__uuid);

        ctx.mutate(ctx);

        return;
      }

      const currentChild = find(
        ctx.items,
        ctx.currentItemUUIDs[ctx.currentItemUUIDs.length - 1]
      );

      if (!currentChild) return;

      if (!currentChild.__parent) return;

      const parentChildren = currentChild.__parent.__children;

      for (let i = 0; i < parentChildren.length; ++i) {
        if (parentChildren[i].__uuid !== currentChild.__uuid) continue;

        if (i - 1 < 0) break;

        const nextChild = parentChildren[i - 1];

        ctx.currentItemUUIDs.pop();
        ctx.currentItemUUIDs.push(nextChild.__uuid);

        ctx.mutate(ctx);

        break;
      }

      break;
    }
    case "ArrowRight": {
      e.preventDefault();

      if (!ctx.currentItemUUIDs.length) return;

      const currentChild = find(
        ctx.items,
        ctx.currentItemUUIDs[ctx.currentItemUUIDs.length - 1]
      );

      if (!currentChild) return;

      if (!currentChild.__children.length) return;

      const nextChild = currentChild.__children[0];

      ctx.currentItemUUIDs.push(nextChild.__uuid);

      ctx.mutate(ctx);

      break;
    }
    case "ArrowLeft": {
      e.preventDefault();

      if (!ctx.currentItemUUIDs.length) return;

      ctx.currentItemUUIDs.pop();

      ctx.collapse = Boolean(!ctx.currentItemUUIDs.length);

      ctx.mutate(ctx);
      break;
    }
    case "Enter": {
      e.preventDefault();

      if (!ctx.currentItemUUIDs.length) return;

      const currentChild = find(
        ctx.items,
        ctx.currentItemUUIDs[ctx.currentItemUUIDs.length - 1]
      );

      if (!currentChild) return;

      if (currentChild.__children.length) {
        const nextChild = currentChild.__children[0];

        ctx.currentItemUUIDs.push(nextChild.__uuid);

        ctx.mutate(ctx);
        return;
      }

      callback(currentChild.__el.props.value);

      ctx.mutate({
        ...ctx,
        collapse: true,
        hovering: false,
        currentItemUUIDs: [],
      });

      break;
    }
  }
}
