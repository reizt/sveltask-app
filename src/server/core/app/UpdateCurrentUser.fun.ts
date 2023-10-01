import type { ServerFun } from '#/server/core/lib/types';
import { authenticateToken } from '#/server/core/modules/authenticate-token';

export const UpdateCurrentUser: ServerFun<'UpdateCurrentUser'> = async (input, ctx) => {
  const currentUser = await authenticateToken({ authToken: input.authToken }, ctx);

  const updatedUser = await ctx.db.user.put({
    ...currentUser,
    name: input.name ?? currentUser.name,
  });

  return updatedUser;
};
