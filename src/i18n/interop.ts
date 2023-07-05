export const interop = (template: string, values: Record<string, any> | undefined): string => {
  if (values == null) return template;

  let result: string = template;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`{${key}:\\w+}`), String(value));
  }
  return result;
};
