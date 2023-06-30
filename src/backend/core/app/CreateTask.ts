import type { Context } from '#/backend/core/context';
import type { InferBackendIn, InferBackendOut } from '#/backend/core/types';
import type * as defs from '#/defs/core';

export const CreateTask = async (input: InferBackendIn<typeof defs.CreateTask>, ctx: Context): Promise<InferBackendOut<typeof defs.CreateTask>> => {
  console.log('CreateTask', input);
  return {
    id: '1',
    userId: '1',
    title: 'title',
    description: 'description',
    status: 'created',
  };
};
