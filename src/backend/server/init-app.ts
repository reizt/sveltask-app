import { env } from '$env/dynamic/private';
import { createApp } from '%b/core/create-app';
import { createDatabasePlugin } from '%b/drivers/drizzle/plugin';
import { SendgridMailer } from '%b/drivers/mailer/sendgrid';
import { JwtSerializer } from '%b/drivers/serializer/jwt';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const initApp = async () => {
  const postgresClient = postgres(env.DATABASE_URL);
  const client = drizzle(postgresClient);
  // await migrate(client, {
  //   migrationsFolder: 'src/backend/drivers/drizzle/out',
  // });
  const db = createDatabasePlugin(client);
  const serializer = new JwtSerializer(env.JWT_PRIVATE_KEY, env.JWT_PUBLIC_KEY);
  const mailer = new SendgridMailer();
  return createApp({ db, serializer, mailer });
};
