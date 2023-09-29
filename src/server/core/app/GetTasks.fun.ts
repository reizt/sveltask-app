import type { ServerFun } from '#/server/core/lib/types';
import { authorizeLogin } from '#/server/core/modules/authorize-login';

export const GetTasks: ServerFun<'GetTasks'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  const tasks = await ctx.db.tasks.findMany({
    where: { userId: currentUser.id },
  });

  return tasks;
};
