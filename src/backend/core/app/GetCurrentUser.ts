import type { Fun } from '%b/core/types';

export const GetCurrentUser: Fun<'GetCurrentUser'> = async (input, ctx) => {
  console.log('GetCurrentUser', input);
  return {
    id: '1',
    name: 'name',
    email: 'foo@example.com',
  };
};
