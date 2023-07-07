import { authorizeLogin } from '#/backend/core/modules/authorize-login';
import type { CoreFun } from '#/backend/core/types';

export const GetCurrentUser: CoreFun<'GetCurrentUser'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  return currentUser;
};
