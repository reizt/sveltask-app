import { z } from 'zod';
import type { Endpoint } from '../lib/endpoint';

export const UpdatePassword = {
  method: 'patch',
  path: '/password',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z.object({ password: z.string() }),
  },
  response: {
    successCode: 200,
  },
} satisfies Endpoint;
