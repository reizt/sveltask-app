import { z } from 'zod';
import type { Procedure } from '../lib/procedure';

export const VerifyLogin = {
  method: 'post',
  path: '/verify-login',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z.object({
      code: z.string(),
    }),
  },
  response: {
    successCode: 200,
    cookies: z.object({ authToken: z.string() }),
  },
} satisfies Procedure;
