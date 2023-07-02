import type { Fun } from '%b/core/types';
import { authorizeLogin } from '../funcs/authorize-login';

export const GetCurrentUser: Fun<'GetCurrentUser'> = async (input, ctx) => {
  console.log('GetCurrentUser', input);
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  return currentUser;
};
