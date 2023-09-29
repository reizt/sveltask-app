import type { ServerFun } from '#/server/core/lib/types';
import { authorizeLogin } from '#/server/core/modules/authorize-login';

export const UpdateCurrentUser: ServerFun<'UpdateCurrentUser'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  const updatedUser = await ctx.db.users.update({
    where: { id: currentUser.id },
    data: {
      name: input.name,
    },
  });

  return updatedUser;
};
