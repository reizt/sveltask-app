import type { Context } from '%b/core/context';
import type { InferBackendIn, InferBackendOut } from '%b/core/types';
import type * as defs from '%d/procedures';

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
