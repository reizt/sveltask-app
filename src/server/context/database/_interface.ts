import type * as Tasks from './tasks';
import type * as Users from './users';

export type IDatabase = {
  users: Users._Repository;
  tasks: Tasks._Repository;
  // $transaction: <T>(fn: (tx: IDatabase) => Promise<T>) => Promise<T>;
};
