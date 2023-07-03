import { z } from 'zod';
import { ent_User } from '../entity/schema';
import type { Procedure } from '../lib/procedure';
import { zc } from '../lib/zod';

export const GetCurrentUser = {
  method: 'get',
  path: '/current-user',
  request: {
    cookies: z.object({ authToken: zc.string() }),
  },
  response: {
    successCode: 200,
    body: ent_User,
  },
} satisfies Procedure;
