import type { Fun } from '%b/core/types';
import { authorizeLogin } from '../funcs/authorize-login';
import { newId } from '../funcs/identify';

export const CreateTask: Fun<'CreateTask'> = async (input, ctx) => {
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
