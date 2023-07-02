import type { Fun } from '%b/core/types';
import { authorizeLogin } from '../funcs/authorize-login';

export const GetTasks: Fun<'GetTasks'> = async (input, ctx) => {
  console.log('GetTasks', input);

  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  const tasks = await ctx.db.tasks.findMany({
    where: { userId: currentUser.id },
  });

  return tasks;
};
