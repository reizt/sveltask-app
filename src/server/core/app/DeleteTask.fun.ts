import type { ServerFun } from '#/server/core/lib/types';
import { authenticateToken } from '#/server/core/modules/authenticate-token';

export const DeleteTask: ServerFun<'DeleteTask'> = async (input, ctx) => {
  const currentUser = await authenticateToken({ authToken: input.authToken }, ctx);
  const task = await ctx.db.task.pick({
    where: { id: { eq: input.id } },
  });
  if (task == null || task.userId !== currentUser.id) {
    throw new Error('task not found');
  }

  await ctx.db.task.del(task.id);
};
