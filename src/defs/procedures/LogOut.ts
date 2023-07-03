import { z } from 'zod';
import type { Procedure } from '../lib/procedure';
import { zc } from '../lib/zod';

export const LogOut = {
  method: 'delete',
  path: '/logout',
  request: {
    cookies: z.object({ authToken: zc.string() }),
  },
  response: {
    successCode: 204,
    cookies: z.object({ authToken: zc.string() }),
  },
} satisfies Procedure;
