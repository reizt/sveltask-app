export const objectMap = <V, U, T extends Record<string, V>>(obj: T, callback: <K extends keyof T>(key: K, value: V) => U): U[] => {
  const keys = Object.keys(obj) as (keyof T)[];
  return keys.map((key) => callback(key, obj[key]));
};
