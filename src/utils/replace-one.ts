export const replaceOne = <T extends Record<string, any>>(arr: T[], uniqueKey: keyof T, newItem: T): T[] => {
  return arr.map((item) => {
    if (item[uniqueKey] === newItem[uniqueKey]) {
      return newItem;
    }
    return item;
  });
};
