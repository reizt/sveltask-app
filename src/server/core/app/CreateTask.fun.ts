import type { ServerFun } from '#/server/core/lib/types';
import { authorizeLogin } from '#/server/core/modules/authorize-login';
import { newId } from '#/server/core/modules/identify';

export const CreateTask: ServerFun<'CreateTask'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);

  const task = await ctx.db.tasks.create({
    data: {
      id: newId(),
      userId: currentUser.id,
      title: input.title,
      description: input.description,
      status: input.status,
    },
  });

  return task;
};
