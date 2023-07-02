import { z } from 'zod';

const val_id = z.string().regex(/^[a-zA-Z0-9_-]{8}$/);
const val_createdAt = z.coerce.date();
const val_updatedAt = z.coerce.date();

export const mod_Task = z.object({
  id: val_id,
  createdAt: val_createdAt,
  updatedAt: val_updatedAt,
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(['created', 'progress', 'completed']),
});

export const mod_User = z.object({
  id: val_id,
  createdAt: val_createdAt,
  updatedAt: val_updatedAt,
  name: z.string(),
  email: z.string().email(),
});
