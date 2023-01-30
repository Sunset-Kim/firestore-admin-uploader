export function omit<T, K extends keyof T>(data: T, ...keys: K[]) {
  const _ = { ...data };
  keys.forEach((key) => delete _[key]);
  return _;
}
