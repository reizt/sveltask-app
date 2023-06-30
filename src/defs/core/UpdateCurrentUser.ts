import { z } from 'zod';
import { mod_User } from '../model/model.schema';
import type { Operation } from './_operation';

export const UpdateCurrentUser = {
  id: 'UpdateCurrentUser',
  method: 'patch',
  path: '/current-user',
  request: {
    body: z.object({
      name: mod_User.shape.name,
    }),
  },
  response: {
    successCode: 200,
    body: mod_User,
  },
} satisfies Operation;
