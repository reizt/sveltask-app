import type { ServerFun } from '#/server/core/lib/types';
import { authorizeLogin } from '#/server/core/modules/authorize-login';

export const GetCurrentUser: ServerFun<'GetCurrentUser'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  return currentUser;
};
