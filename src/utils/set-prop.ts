export function setProp<T>(obj: object, propName: string, value: T): void {
  let key = propName;

  if (__VUE__) {
    if (/^on[A-Z]/.test(propName)) {
      key = `on${propName[2].toUpperCase()}${propName.slice(3).toLowerCase()}`; /// onMouseEnter -> onMouseenter
    }
  }

  obj[key] = value;
}
