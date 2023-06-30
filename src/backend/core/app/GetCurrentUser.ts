import type { Context } from '#/backend/core/context';
import type { InferBackendIn, InferBackendOut } from '#/backend/core/types';
import type * as defs from '#/defs/core';

export const GetCurrentUser = async (input: InferBackendIn<typeof defs.GetCurrentUser>, ctx: Context): Promise<InferBackendOut<typeof defs.GetCurrentUser>> => {
  console.log('GetCurrentUser', input);
  return {
    id: '1',
    name: 'name',
    email: 'foo@example.com',
  };
};
