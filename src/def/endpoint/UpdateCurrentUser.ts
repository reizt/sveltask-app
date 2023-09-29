import { z } from 'zod';
import { User } from '../entity/schema';
import type { Endpoint } from '../lib/endpoint';

export const UpdateCurrentUser = {
  method: 'patch',
  path: '/current-user',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z
      .object({
        name: User.shape.name,
      })
      .partial(),
  },
  response: {
    successCode: 200,
    body: User,
  },
} satisfies Endpoint;
