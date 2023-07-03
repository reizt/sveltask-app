import { z } from 'zod';
import { zc } from '../lib/zod';

const val_id = zc.string().regex(/^[a-zA-Z0-9_-]{8}$/);
const val_createdAt = zc.date();
const val_updatedAt = zc.date();

export const ent_Task = z.object({
  id: val_id,
  createdAt: val_createdAt,
  updatedAt: val_updatedAt,
  userId: zc.string(),
  title: zc.string(),
  description: zc.string().nullable(),
  status: z.enum(['created', 'progress', 'completed']),
});

export const ent_User = z.object({
  id: val_id,
  createdAt: val_createdAt,
  updatedAt: val_updatedAt,
  name: zc.string(),
  email: zc.string().email(),
});
