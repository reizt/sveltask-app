import { z } from 'zod';
import { ent_Task } from '../entity/schema';
import type { Procedure } from '../lib/procedure';

export const GetTasks = {
  method: 'get',
  path: '/tasks',
  request: {
    cookies: z.object({ authToken: z.string() }),
  },
  response: {
    successCode: 200,
    body: z.array(ent_Task),
  },
} satisfies Procedure;
