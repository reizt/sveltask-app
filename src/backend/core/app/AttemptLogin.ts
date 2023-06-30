import type { Context } from '%b/core/context';
import type { InferBackendIn, InferBackendOut } from '%b/core/types';
import type * as defs from '%d/procedures';

export const AttemptLogin = async (input: InferBackendIn<typeof defs.AttemptLogin>, ctx: Context): Promise<InferBackendOut<typeof defs.AttemptLogin>> => {
  console.log('AttemptLogin', input);
};
