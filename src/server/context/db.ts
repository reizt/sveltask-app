import type { dbConfig } from './db.config';
import type { DatabaseClient } from './db.mold';

export type IDatabase = DatabaseClient<typeof dbConfig>;
