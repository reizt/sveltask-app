import type { Context } from '%b/core/context';
import type { InferBackendIn, InferBackendOut } from '%b/core/types';
import type * as defs from '%d/procedures';

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
