import type { Config } from 'drizzle-kit';

export default {
  schema: './src/backend/drivers/drizzle/schema.ts',
  out: './src/backend/drivers/drizzle/out',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
