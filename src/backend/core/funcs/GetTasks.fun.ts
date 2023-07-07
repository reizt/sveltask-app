import { authorizeLogin } from '#/backend/core/modules/authorize-login';
import type { CoreFun } from '#/backend/core/types';

export const GetTasks: CoreFun<'GetTasks'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  const tasks = await ctx.db.tasks.findMany({
    where: { userId: currentUser.id },
  });

  return tasks;
};
