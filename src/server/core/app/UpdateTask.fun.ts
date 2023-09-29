import type { ServerFun } from '#/server/core/lib/types';
import { authorizeLogin } from '#/server/core/modules/authorize-login';

export const UpdateTask: ServerFun<'UpdateTask'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);
  const task = await ctx.db.tasks.findById({
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
