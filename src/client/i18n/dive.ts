export const dive = <T>(obj: T, key: string): string => {
  const value = key.split('.').reduce((acc, key) => acc[key as keyof typeof acc] as any, obj);
  return value as string;
};
