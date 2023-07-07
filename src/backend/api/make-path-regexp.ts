export const makePathRegExp = (path: string) => {
  return new RegExp(`^${path.replace(/\{([^}]+)\}/g, '(?<$1>[^/?]+)')}[^/]*$`);
};
