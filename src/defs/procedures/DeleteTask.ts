import { z } from 'zod';
import type { Procedure } from '../lib/procedure';

export const DeleteTask = {
  method: 'delete',
  path: '/tasks/{id}',
  request: {
    cookies: z.object({ authToken: z.string() }),
    params: z.object({ id: z.string() }),
  },
  response: {
    successCode: 204,
  },
} satisfies Procedure;
