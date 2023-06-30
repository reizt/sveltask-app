import { pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

const id = varchar('id', { length: 36 }).primaryKey().notNull();
const createdAt = timestamp('created_at').defaultNow().notNull();
const updatedAt = timestamp('updated_at').defaultNow().notNull();

export const users = pgTable('users', {
  ...{ id, createdAt, updatedAt },
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
});

export const taskStautuses = pgEnum('task_statuses', ['created', 'progress', 'completed']);

export const tasks = pgTable('tasks', {
  ...{ id, createdAt, updatedAt },
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  status: taskStautuses('status').notNull(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => users.id),
});

export const verifications = pgTable('verifications', {
  ...{ id, createdAt, updatedAt },
  email: varchar('email', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
});
