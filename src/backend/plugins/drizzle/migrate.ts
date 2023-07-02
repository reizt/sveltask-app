import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { resolve } from 'path';
import postgres from 'postgres';

const client = postgres(env.DATABASE_URL, { max: 1 });

await migrate(drizzle(client), {
  migrationsFolder: resolve(__dirname, './out'),
});
