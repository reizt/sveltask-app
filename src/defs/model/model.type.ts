import type { z } from 'zod';
import type * as s from './model.schema';

export type Task = z.infer<typeof s.mod_Task>;
export type User = z.infer<typeof s.mod_User>;
