import type { Context } from '%b/core/context';
import type { InferBackendIn, InferBackendOut } from '%b/core/types';
import type * as defs from '%d/procedures';

export const VerifyLogin = async (input: InferBackendIn<typeof defs.VerifyLogin>, ctx: Context): Promise<InferBackendOut<typeof defs.VerifyLogin>> => {
  console.log('VerifyLogin', input);
  return { authToken: '1234567890' };
};
