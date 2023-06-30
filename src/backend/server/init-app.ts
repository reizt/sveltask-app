import { createApp } from '%b/core/create-app';
import { createDatabasePlugin } from '%b/drivers/drizzle/plugin';
import { JwtSerializer } from '%b/drivers/serializer/jwt';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const initApp = () => {
  const postgresClient = postgres(process.env.DATABASE_URL);
  const client = drizzle(postgresClient);
  const db = createDatabasePlugin(client);
  const serializer = new JwtSerializer(process.env.JWT_PRIVATE_KEY, process.env.JWT_PUBLIC_KEY);
  return createApp({ db, serializer });
};
