import { z } from 'zod';
import { mod_User } from '../model/model.schema';
import type { Operation } from './_operation';

export const AttemptLogin = {
  id: 'AttemptLogin',
  method: 'post',
  path: '/attempt-login',
  request: {
    body: z.object({
      email: mod_User.shape.email,
    }),
  },
  response: {
    successCode: 204,
  },
} satisfies Operation;
