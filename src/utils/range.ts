export function range(a: number, b: number): number {
  let max = Math.max(a, b);
  let min = Math.min(a, b);

  return Math.random() * (max - min) + min;
}
