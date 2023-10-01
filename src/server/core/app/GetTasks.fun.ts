import type { ServerFun } from '#/server/core/lib/types';
import { authenticateToken } from '#/server/core/modules/authenticate-token';

export const GetTasks: ServerFun<'GetTasks'> = async (input, ctx) => {
  const currentUser = await authenticateToken({ authToken: input.authToken }, ctx);

  const tasks = await ctx.db.task.collect({
    where: { userId: { eq: currentUser.id } },
  });

  return tasks;
};
