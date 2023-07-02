import type { Fun } from '%b/core/types';
import { authorizeLogin } from '../funcs/authorize-login';

export const UpdateTask: Fun<'UpdateTask'> = async (input, ctx) => {
  console.log('UpdateTask', input);

  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);
  const task = await ctx.db.tasks.findFirst({
    where: { id: input.id },
  });
  if (task == null || task.userId !== currentUser.id) {
    throw new Error('task not found');
  }

  const updatedTask = await ctx.db.tasks.update({
    where: { id: task.id },
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
    },
  });
  return updatedTask;
};
