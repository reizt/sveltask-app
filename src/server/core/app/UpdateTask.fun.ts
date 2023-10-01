import type { ServerFun } from '#/server/core/lib/types';
import { authenticateToken } from '#/server/core/modules/authenticate-token';

export const UpdateTask: ServerFun<'UpdateTask'> = async (input, ctx) => {
  const currentUser = await authenticateToken({ authToken: input.authToken }, ctx);
  const task = await ctx.db.task.pick({
    where: { id: { eq: input.id } },
  });
  if (task == null || task.userId !== currentUser.id) {
    throw new Error('task not found');
  }

  const updatedTask = await ctx.db.task.put({
    ...task,
    title: input.title ?? task.title,
    description: input.description ?? task.description,
    status: input.status ?? task.status,
  });
  return updatedTask;
};
