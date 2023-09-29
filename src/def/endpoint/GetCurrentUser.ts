import { z } from 'zod';
import { User } from '../entity/schema';
import type { Endpoint } from '../lib/endpoint';

export const GetCurrentUser = {
  method: 'get',
  path: '/current-user',
  request: {
    cookies: z.object({ authToken: z.string() }),
  },
  response: {
    successCode: 200,
    body: User,
  },
} satisfies Endpoint;
