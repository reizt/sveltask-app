import { z } from 'zod';
import type { Endpoint } from '../lib/endpoint';

export const VerifyCode = {
  method: 'post',
  path: '/code/verify',
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
} satisfies Endpoint;
