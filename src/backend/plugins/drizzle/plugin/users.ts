import type { Users } from '%b/core/context/database';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as tb from '../schema';
import type { WithDB } from '../types';

export const createUsersRepository = (db: PostgresJsDatabase): Users._Repository => ({
  findMany: async (args) => await findMany(db, args),
  findFirst: async (args) => await findFirst(db, args),
  create: async (args) => await create(db, args),
  update: async (args) => await update(db, args),
  remove: async (args) => await remove(db, args),
});

type Fn<T extends keyof Users._Repository> = WithDB<Users._Repository[T]>;

const findMany: Fn<'findMany'> = async (db, args) => {
  const rows = await db.select().from(tb.users);
  return rows;
};

const findFirst: Fn<'findFirst'> = async (db, args) => {
  const rows = await db
    .select()
    .from(tb.users)
    .limit(1)
    .where((cols) => {
      if (args.where.id != null) {
        return eq(cols.id, args.where.id);
      }
      return undefined;
    });
  return rows[0] ?? null;
};

const create: Fn<'create'> = async (db, args) => {
  const rows = await db.insert(tb.users).values(args.data).returning();
  const affected = rows[0];
  if (affected == null) {
    throw new Error('Failed to insert');
  }
  return affected;
};

const update: Fn<'update'> = async (db, args) => {
  const rows = await db.update(tb.users).set(args.data).where(eq(tb.users.id, args.where.id)).returning();
  const affected = rows[0];
  if (affected == null) {
    throw new Error('Failed to update');
  }
  return affected;
};

const remove: Fn<'remove'> = async (db, args) => {
  const rows = await db.delete(tb.users).where(eq(tb.users.id, args.where.id)).returning();
  const affected = rows[0];
  if (affected == null) {
    throw new Error('Failed to delete');
  }
  return affected;
};
