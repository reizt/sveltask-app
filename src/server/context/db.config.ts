import type { EntityConfig, PropConfig } from './db.mold';

const id = { type: 'string' } satisfies PropConfig;
const datetime = { type: 'number' } satisfies PropConfig;
const createdAt = datetime;
const updatedAt = datetime;

const user = {
  id,
  createdAt,
  updatedAt,
  email: { type: 'string' },
  name: { type: 'string' },
  passwordDigest: { type: 'string', optional: true },
} satisfies EntityConfig;

const task = {
  id,
  createdAt,
  updatedAt,
  userId: user.id,
  title: { type: 'string' },
  description: { type: 'string', optional: true },
  status: { type: 'string', enum: ['created', 'progress', 'completed'] as const },
} satisfies EntityConfig;

export const dbConfig = {
  user,
  task,
};
