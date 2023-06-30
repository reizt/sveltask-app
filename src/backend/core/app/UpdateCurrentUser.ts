import type { Fun } from '%b/core/types';

export const UpdateCurrentUser: Fun<'UpdateCurrentUser'> = async (input, ctx) => {
  console.log('UpdateCurrentUser', input);
  return {
    id: '1',
    name: 'name',
    email: 'foo@example.com',
  };
};
