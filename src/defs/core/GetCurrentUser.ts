import { z } from 'zod';
import { mod_User } from '../model/model.schema';
import type { Operation } from './_operation';

export const GetCurrentUser = {
  id: 'GetCurrentUser',
  method: 'get',
  path: '/current-user',
  request: {
    cookies: z.object({
      authToken: z.string(),
    }),
  },
  response: {
    successCode: 200,
    body: mod_User,
  },
} satisfies Operation;
