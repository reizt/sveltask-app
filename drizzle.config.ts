import dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

export default {
  schema: './src/backend/plugins/drizzle/schema.ts',
  out: process.env.DRIZZLE_OUTDIR!,
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
