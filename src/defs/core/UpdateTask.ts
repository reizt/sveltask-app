import { z } from 'zod';
import { mod_Task } from '../model/model.schema';
import type { Operation } from './_operation';

export const UpdateTask = {
  id: 'UpdateTask',
  method: 'patch',
  path: '/tasks/{id}',
  request: {
    body: z.object({
      id: mod_Task.shape.id,
      data: z.object({
        title: mod_Task.shape.title,
        description: mod_Task.shape.description,
        status: mod_Task.shape.status,
      }),
    }),
    cookies: z.object({
      authToken: z.string(),
    }),
  },
  response: {
    successCode: 200,
    body: mod_Task,
  },
} satisfies Operation;
