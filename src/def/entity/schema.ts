import { z } from 'zod';

const id = z.string().regex(/^[a-zA-Z0-9_-]{8}$/);
const datetime = z.number().int().positive();
const createdAt = datetime;
const updatedAt = datetime;

// Contains at least 1 digit, 1 lowercase, 1 uppercase, and 8-24 characters
export const password = z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w!"#$%&'()*+,./:;<=>?@[-^`{|}~]{8,24}$/);

export const User = z.object({
  ...{ id, createdAt, updatedAt },
  name: z.string().max(100),
  email: z.string().email(),
});

export const Task = z.object({
  ...{ id, createdAt, updatedAt },
  userId: User.shape.id,
  title: z.string().max(100),
  description: z.string().optional(),
  status: z.enum(['created', 'progress', 'completed']),
});
