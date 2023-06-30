import type { Fun } from '%b/core/types';

export const VerifyLogin: Fun<'VerifyLogin'> = async (input, ctx) => {
  console.log('VerifyLogin', input);
  return { authToken: '1234567890' };
};
