import fs from "fs";

export function readData<T = unknown>(...paths: string[]): T[] {
  return paths
    .map((path) => {
      try {
        const json = fs.readFileSync(path, "utf-8");
        return JSON.parse(json);
      } catch (error) {
        return;
      }
    })
    .filter((x) => x);
}
