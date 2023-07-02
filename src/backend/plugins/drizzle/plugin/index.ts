import type { IDatabase } from '%b/core/context/database';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { createTasksRepository } from './tasks';
import { createUsersRepository } from './users';

export const createDatabasePlugin = (db: PostgresJsDatabase): IDatabase => {
  const users = createUsersRepository(db);
  const tasks = createTasksRepository(db);
  return {
    users,
    tasks,
  };
};
