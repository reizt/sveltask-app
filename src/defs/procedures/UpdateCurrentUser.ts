import { z } from 'zod';
import { ent_User } from '../entity/schema';
import type { Procedure } from '../lib/procedure';

export const UpdateCurrentUser = {
  method: 'patch',
  path: '/current-user',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z
      .object({
        name: ent_User.shape.name,
      })
      .partial(),
  },
  response: {
    successCode: 200,
    body: ent_User,
  },
} satisfies Procedure;
