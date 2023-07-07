import { authorizeLogin } from '#/backend/core/modules/authorize-login';
import { newId } from '#/backend/core/modules/identify';
import type { CoreFun } from '#/backend/core/types';

export const CreateTask: CoreFun<'CreateTask'> = async (input, ctx) => {
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
