import { z } from 'zod';
import { ent_Task } from '../entity/schema';
import type { Procedure } from '../lib/procedure';
import { zc } from '../lib/zod';

export const UpdateTask = {
  method: 'patch',
  path: '/tasks/{id}',
  request: {
    cookies: z.object({ authToken: zc.string() }),
    params: z.object({ id: zc.string() }),
    body: z
      .object({
        title: ent_Task.shape.title,
        description: ent_Task.shape.description,
        status: ent_Task.shape.status,
      })
      .partial(),
  },
  response: {
    successCode: 200,
    body: ent_Task,
  },
} satisfies Procedure;
