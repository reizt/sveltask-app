import { z } from 'zod';
import { Task } from '../entity/schema';
import type { Endpoint } from '../lib/endpoint';

export const CreateTask = {
  method: 'post',
  path: '/tasks',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z.object({
      title: Task.shape.title,
      description: Task.shape.description,
      status: Task.shape.status,
    }),
  },
  response: {
    successCode: 201,
    body: Task,
  },
} satisfies Endpoint;
