import { Comment, Fragment, VNodeArrayChildren } from "vue";

function isPrimitive(vnode: unknown): vnode is string | number | boolean {
  return ["string", "number", "boolean"].includes(typeof vnode);
}

export function isEmpty(vnodes: VNodeArrayChildren): boolean {
  return vnodes.every((vnode) => {
    if (Array.isArray(vnode)) {
      return isEmpty(vnode);
    }

    if (isPrimitive(vnode)) {
      return false;
    }

    if (vnode == null || vnode.type === Comment) {
      return true;
    }

    if (vnode.type === Fragment) {
      if (Array.isArray(vnode.children)) {
        return isEmpty(vnode.children);
      }

      if (vnode.children === null) {
        return true;
      }

      return false;
    }

    return false;
  });
}
