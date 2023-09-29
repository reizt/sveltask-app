import { z } from 'zod';
import { User } from '../entity/schema';
import type { Endpoint } from '../lib/endpoint';

export const IssueCode = {
  method: 'post',
  path: '/attempt-login',
  request: {
    body: z.object({
      email: User.shape.email,
    }),
  },
  response: {
    successCode: 204,
    cookies: z.object({ authToken: z.string() }),
  },
} satisfies Endpoint;
