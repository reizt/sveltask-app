import { authorizeLogin } from '#/backend/core/modules/authorize-login';
import type { CoreFun } from '#/backend/core/types';

export const UpdateCurrentUser: CoreFun<'UpdateCurrentUser'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  const updatedUser = await ctx.db.users.update({
    where: { id: currentUser.id },
    data: {
      name: input.name,
    },
  });

  return updatedUser;
};
