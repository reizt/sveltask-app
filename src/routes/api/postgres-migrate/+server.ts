import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { resolve } from 'path';
import postgres from 'postgres';
import drizzleConfig from '../../../../drizzle.config';
import type { RequestHandler } from './$types';

const unauthorizedResponse = new Response('Unauthorized', { status: 401 });

export const POST: RequestHandler = async (event) => {
  try {
    const body = await event.request.json();
    if (body.apiKey !== env.PRIVATE_API_KEY) {
      return unauthorizedResponse;
    }
  } catch {
    return unauthorizedResponse;
  }
  const pgClient = postgres(env.DATABASE_URL);
  const client = drizzle(pgClient);

  const files = await readdir(resolve('.', './node_modules'));
  console.log(files);

  const dir = resolve('.', drizzleConfig.out);
  console.log(dir, existsSync(dir));

  await migrate(client, {
    migrationsFolder: drizzleConfig.out,
  });
  return new Response('OK', { status: 200 });
};
