import { z } from 'zod';
import type { Procedure } from '../lib/procedure';

export const LogOut = {
  method: 'delete',
  path: '/logout',
  request: {
    cookies: z.object({ authToken: z.string() }),
  },
  response: {
    successCode: 204,
    cookies: z.object({ authToken: z.string() }),
  },
} satisfies Procedure;
