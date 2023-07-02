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
