import type { Context } from '#/backend/core/context';
import type { InferBackendIn, InferBackendOut } from '#/backend/core/types';
import type * as defs from '#/defs/core';

export const UpdateCurrentUser = async (
  input: InferBackendIn<typeof defs.UpdateCurrentUser>,
  ctx: Context,
): Promise<InferBackendOut<typeof defs.UpdateCurrentUser>> => {
  console.log('UpdateCurrentUser', input);
  return {
    id: '1',
    name: 'name',
    email: 'foo@example.com',
  };
};
