import { z } from 'zod';
import { mod_Task } from '../model/model.schema';
import type { Operation } from './_operation';

export const CreateTask = {
  id: 'CreateTask',
  method: 'post',
  path: '/tasks',
  request: {
    body: z.object({
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
    successCode: 201,
    body: mod_Task,
  },
} satisfies Operation;
