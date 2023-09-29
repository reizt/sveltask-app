import { z } from 'zod';

const id = z.string().regex(/^[a-zA-Z0-9_-]{8}$/);
const createdAt = z.date();
const updatedAt = z.date();

export const User = z.object({
  ...{ id, createdAt, updatedAt },
  name: z.string().max(100),
  email: z.string().email(),
});

export const Task = z.object({
  ...{ id, createdAt, updatedAt },
  userId: User.shape.id,
  title: z.string().max(100),
  description: z.string().nullable(),
  status: z.enum(['created', 'progress', 'completed']),
});
