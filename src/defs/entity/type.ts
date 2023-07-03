import type { z } from 'zod';
import type * as s from './schema';

export type Task = z.infer<typeof s.ent_Task>;
export type User = z.infer<typeof s.ent_User>;
