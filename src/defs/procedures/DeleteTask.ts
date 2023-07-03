import { z } from 'zod';
import type { Procedure } from '../lib/procedure';
import { zc } from '../lib/zod';

export const DeleteTask = {
  method: 'delete',
  path: '/tasks/{id}',
  request: {
    cookies: z.object({ authToken: zc.string() }),
    params: z.object({ id: zc.string() }),
  },
  response: {
    successCode: 204,
  },
} satisfies Procedure;
