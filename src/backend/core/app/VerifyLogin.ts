import type { Context } from '#/backend/core/context';
import type { InferBackendIn, InferBackendOut } from '#/backend/core/types';
import type * as defs from '#/defs/core';

export const VerifyLogin = async (input: InferBackendIn<typeof defs.VerifyLogin>, ctx: Context): Promise<InferBackendOut<typeof defs.VerifyLogin>> => {
  console.log('VerifyLogin', input);
  return { authToken: '1234567890' };
};
