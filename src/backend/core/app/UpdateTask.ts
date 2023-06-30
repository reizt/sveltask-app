import type { Context } from '#/backend/core/context';
import type { InferBackendIn, InferBackendOut } from '#/backend/core/types';
import type * as defs from '#/defs/core';

export const UpdateTask = async (input: InferBackendIn<typeof defs.UpdateTask>, ctx: Context): Promise<InferBackendOut<typeof defs.UpdateTask>> => {
  console.log('UpdateTask', input);
  return {
    id: '1',
    userId: '1',
    title: 'title',
    description: 'description',
    status: 'created',
  };
};
