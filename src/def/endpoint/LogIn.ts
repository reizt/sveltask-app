import { z } from 'zod';
import { User, password } from '../entity/schema';
import type { Endpoint } from '../lib/endpoint';

export const LogIn = {
  method: 'post',
  path: '/login',
  request: {
    body: z.object({
      email: User.shape.email,
      password,
    }),
  },
  response: {
    successCode: 200,
    cookies: z.object({ authToken: z.string() }),
  },
} satisfies Endpoint;
