import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export type WithDB<T> = T extends (args: infer A) => infer R ? (db: PostgresJsDatabase, args: A) => R : never;
