import { z } from 'zod';
import { val_id } from './value.schema';

export const mod_Task = z.object({
  id: val_id,
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(['created', 'progress', 'completed']),
});

export const mod_User = z.object({
  id: val_id,
  name: z.string(),
  email: z.string().email(),
});

export const mod_Verification = z.object({
  id: val_id,
  email: z.string().email(),
  token: z.string().min(1),
  expiresAt: z.number(),
});
