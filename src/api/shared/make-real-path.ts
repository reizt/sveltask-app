export const makeRealPath = (path: string, params: Record<string, string>) => {
  let newPath = path;
  for (const param in params) {
    newPath = newPath.replace(`{${param}}`, params[param]!);
  }
  return newPath;
};
