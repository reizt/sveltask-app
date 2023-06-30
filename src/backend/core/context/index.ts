import type { IDatabase } from './database';
import type { ISerializer } from './serializer';

export type Context = {
  db: IDatabase;
  serializer: ISerializer;
};
