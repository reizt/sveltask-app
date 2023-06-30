import { createApp } from '%b/core/create-app';
import { createDatabasePlugin } from '%b/drivers/drizzle/plugin';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const initApp = () => {
  const postgresClient = postgres(process.env.DATABASE_URL);
  const client = drizzle(postgresClient);
  const db = createDatabasePlugin(client);
  return createApp({ db });
};
