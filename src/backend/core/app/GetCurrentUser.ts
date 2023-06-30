import type { Context } from '%b/core/context';
import type { InferBackendIn, InferBackendOut } from '%b/core/types';
import type * as defs from '%d/procedures';

export const GetCurrentUser = async (input: InferBackendIn<typeof defs.GetCurrentUser>, ctx: Context): Promise<InferBackendOut<typeof defs.GetCurrentUser>> => {
  console.log('GetCurrentUser', input);
  return {
    id: '1',
    name: 'name',
    email: 'foo@example.com',
  };
};
