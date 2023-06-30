import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { resolve } from 'path';
import postgres from 'postgres';

const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });

await migrate(drizzle(migrationClient), {
  migrationsFolder: resolve(__dirname, './out'),
});
