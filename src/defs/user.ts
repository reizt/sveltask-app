export type User = {
  id: string;
  name: string;
  email: string;
};
export const userFields: Record<keyof User, keyof User> = {
  id: 'id',
  name: 'name',
  email: 'email',
};
