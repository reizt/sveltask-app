import type { Fun } from '%b/core/types';

export const LogOut: Fun<'LogOut'> = async (input, ctx) => {
  console.log('LogOut', input);

  return { authToken: '' };
};
