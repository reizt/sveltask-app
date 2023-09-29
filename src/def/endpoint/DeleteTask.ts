import { z } from 'zod';
import { Task } from '../entity/schema';
import type { Endpoint } from '../lib/endpoint';

export const DeleteTask = {
  method: 'delete',
  path: '/tasks/{id}',
  request: {
    cookies: z.object({ authToken: z.string() }),
    params: z.object({
      id: Task.shape.id,
    }),
  },
  response: {
    successCode: 204,
  },
} satisfies Endpoint;
