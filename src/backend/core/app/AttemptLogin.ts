import type { Context } from '#/backend/core/context';
import type { InferBackendIn, InferBackendOut } from '#/backend/core/types';
import type * as defs from '#/defs/core';

export const AttemptLogin = async (input: InferBackendIn<typeof defs.AttemptLogin>, ctx: Context): Promise<InferBackendOut<typeof defs.AttemptLogin>> => {
  console.log('AttemptLogin', input);
};
