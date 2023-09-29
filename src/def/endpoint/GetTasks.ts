import { z } from 'zod';
import { Task } from '../entity/schema';
import type { Endpoint } from '../lib/endpoint';

export const GetTasks = {
  method: 'get',
  path: '/tasks',
  request: {
    cookies: z.object({ authToken: z.string() }),
  },
  response: {
    successCode: 200,
    body: z.array(Task),
  },
} satisfies Endpoint;
