import type { z } from 'zod';
import type * as s from './schema';

export type Task = z.infer<typeof s.Task>;
export type User = z.infer<typeof s.User>;
