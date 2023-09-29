import { z } from 'zod';
import { Task } from '../entity/schema';
import type { Endpoint } from '../lib/endpoint';

export const UpdateTask = {
  method: 'patch',
  path: '/tasks/{id}',
  request: {
    cookies: z.object({ authToken: z.string() }),
    params: z.object({ id: z.string() }),
    body: z
      .object({
        title: Task.shape.title,
        description: Task.shape.description,
        status: Task.shape.status,
      })
      .partial(),
  },
  response: {
    successCode: 200,
    body: Task,
  },
} satisfies Endpoint;
