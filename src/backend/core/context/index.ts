import type { IDatabase } from './database';
import type { IMailer } from './mailer';
import type { ISerializer } from './serializer';

export type Context = {
  db: IDatabase;
  serializer: ISerializer;
  mailer: IMailer;
};
