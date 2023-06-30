import { z } from 'zod';
import { mod_Task } from '../model/model.schema';
import type { Operation } from './_operation';

export const DeleteTask = {
  id: 'DeleteTask',
  method: 'delete',
  path: '/tasks/{id}',
  request: {
    body: z.object({
      id: mod_Task.shape.id,
    }),
    cookies: z.object({
      authToken: z.string(),
    }),
  },
  response: {
    successCode: 204,
  },
} satisfies Operation;
