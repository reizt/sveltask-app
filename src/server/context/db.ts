import type { Dynmr, EntConfig, PropConfig } from 'dynmr';

const createdAt = { type: 'N' } satisfies PropConfig;
const updatedAt = { type: 'N' } satisfies PropConfig;

const user = {
  id: { type: 'S', gsi: { readCapacityUnits: 0, writeCapacityUnits: 0 } },
  createdAt,
  updatedAt,
  email: { type: 'S', gsi: { readCapacityUnits: 0, writeCapacityUnits: 0 } },
  name: { type: 'S' },
  passwordDigest: { type: 'S', optional: true },
} satisfies EntConfig;

const task = {
  id: { type: 'S', gsi: { readCapacityUnits: 0, writeCapacityUnits: 0 } },
  createdAt,
  updatedAt,
  userId: { type: 'S', gsi: { readCapacityUnits: 0, writeCapacityUnits: 0 } },
  title: { type: 'S' },
  description: { type: 'S', optional: true },
  status: { type: 'S', enum: ['created', 'progress', 'completed'] as const },
} satisfies EntConfig;

export const dbConfig = {
  user,
  task,
};

export type IDatabase = Dynmr<typeof dbConfig>;
