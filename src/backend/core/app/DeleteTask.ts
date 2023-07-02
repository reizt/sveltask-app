import type { Fun } from '%b/core/types';
import { authorizeLogin } from '../funcs/authorize-login';

export const DeleteTask: Fun<'DeleteTask'> = async (input, ctx) => {
  console.log('DeleteTask', input);

  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);
  const task = await ctx.db.tasks.findFirst({
    where: { id: input.id },
  });
  if (task == null || task.userId !== currentUser.id) {
    throw new Error('task not found');
  }

  await ctx.db.tasks.remove({
    where: { id: task.id },
  });
};
