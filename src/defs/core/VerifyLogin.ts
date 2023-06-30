import { z } from 'zod';
import { mod_Verification } from '../model/model.schema';
import type { Operation } from './_operation';

export const VerifyLogin = {
  id: 'VerifyLogin',
  method: 'post',
  path: '/verify-login',
  request: {
    body: z.object({
      verificationId: mod_Verification.shape.id,
      token: mod_Verification.shape.token,
    }),
  },
  response: {
    successCode: 200,
    cookies: z.object({
      authToken: z.string(),
    }),
  },
} satisfies Operation;
