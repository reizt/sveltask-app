import type { Fun } from '%b/core/types';
import { authorizeLogin } from '../funcs/authorize-login';

export const UpdateCurrentUser: Fun<'UpdateCurrentUser'> = async (input, ctx) => {
  console.log('UpdateCurrentUser', input);
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  const updatedUser = await ctx.db.users.update({
    where: { id: currentUser.id },
    data: {
      name: input.data.name,
    },
  });

  return updatedUser;
};
