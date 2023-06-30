import type { Context } from '#/backend/core/context';
import type { InferBackendIn, InferBackendOut } from '#/backend/core/types';
import type * as defs from '#/defs/core';

export const DeleteTask = async (input: InferBackendIn<typeof defs.DeleteTask>, ctx: Context): Promise<InferBackendOut<typeof defs.DeleteTask>> => {
  console.log('DeleteTask', input);
};
