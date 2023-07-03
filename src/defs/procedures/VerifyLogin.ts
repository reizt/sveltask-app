import { z } from 'zod';
import type { Procedure } from '../lib/procedure';
import { zc } from '../lib/zod';

export const VerifyLogin = {
  method: 'post',
  path: '/verify-login',
  request: {
    cookies: z.object({ authToken: zc.string() }),
    body: z.object({
      code: zc.string(),
    }),
  },
  response: {
    successCode: 200,
    cookies: z.object({ authToken: zc.string() }),
  },
} satisfies Procedure;
