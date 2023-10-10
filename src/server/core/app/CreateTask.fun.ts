import { timestamp } from '#/server/context/db.identify';
import type { ServerFun } from '#/server/core/lib/types';
import { authenticateToken } from '#/server/core/modules/authenticate-token';
import { newId } from '#/server/core/modules/identify';

export const CreateTask: ServerFun<'CreateTask'> = async (input, ctx) => {
  const currentUser = await authenticateToken({ authToken: input.authToken }, ctx);

  const task = await ctx.db.task.create({
    id: newId(),
    createdAt: timestamp(),
    updatedAt: timestamp(),
    userId: currentUser.id,
    title: input.title,
    description: input.description,
    status: input.status,
  });

  return task;
};
