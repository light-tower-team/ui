export function setProp(obj: object, propName: string, value: any): void {
  let key = propName;

  if (__VUE__) {
    if (/^on[A-Z]/.test(propName)) {
      key = `on${propName[2].toUpperCase()}${propName.slice(3).toLowerCase()}`; /// onMouseEnter -> onMouseenter
    }
  }

  obj[key] = value;
}
