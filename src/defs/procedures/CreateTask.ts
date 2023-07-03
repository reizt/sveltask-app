import { z } from 'zod';
import { ent_Task } from '../entity/schema';
import type { Procedure } from '../lib/procedure';

export const CreateTask = {
  method: 'post',
  path: '/tasks',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z.object({
      title: ent_Task.shape.title,
      description: ent_Task.shape.description,
      status: ent_Task.shape.status,
    }),
  },
  response: {
    successCode: 201,
    body: ent_Task,
  },
} satisfies Procedure;
