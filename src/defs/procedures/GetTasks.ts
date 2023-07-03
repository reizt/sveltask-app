import { z } from 'zod';
import { ent_Task } from '../entity/schema';
import type { Procedure } from '../lib/procedure';
import { zc } from '../lib/zod';

export const GetTasks = {
  method: 'get',
  path: '/tasks',
  request: {
    cookies: z.object({ authToken: zc.string() }),
  },
  response: {
    successCode: 200,
    body: z.array(ent_Task),
  },
} satisfies Procedure;
