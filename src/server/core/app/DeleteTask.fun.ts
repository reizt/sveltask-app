import type { ServerFun } from '#/server/core/lib/types';
import { authorizeLogin } from '#/server/core/modules/authorize-login';

export const DeleteTask: ServerFun<'DeleteTask'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);
  const task = await ctx.db.tasks.findById({
    where: { id: input.id },
  });
  if (task == null || task.userId !== currentUser.id) {
    throw new Error('task not found');
  }

  await ctx.db.tasks.remove({
    where: { id: task.id },
  });
};
