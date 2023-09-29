import type { IDatabase, Tasks, Users } from '#/server/context/database';
import { createTask, findTaskById, findTaskMany, removeTask, updateTask } from './tasks.repo';
import type { DynamodbContext } from './types';
import { createUser, findUserByEmail, findUserById, removeUser, updateUser } from './users.repo';

export const createDynamoDbPlugin = (ctx: DynamodbContext): IDatabase => {
  const users: Users._Repository = {
    findById: async (args) => await findUserById(ctx, args),
    findByEmail: async (args) => await findUserByEmail(ctx, args),
    create: async (args) => await createUser(ctx, args),
    update: async (args) => await updateUser(ctx, args),
    remove: async (args) => await removeUser(ctx, args),
  };
  const tasks: Tasks._Repository = {
    findMany: async (args) => await findTaskMany(ctx, args),
    findById: async (args) => await findTaskById(ctx, args),
    create: async (args) => await createTask(ctx, args),
    update: async (args) => await updateTask(ctx, args),
    remove: async (args) => await removeTask(ctx, args),
  };

  return {
    users,
    tasks,
  };
};
