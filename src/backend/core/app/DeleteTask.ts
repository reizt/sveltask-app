import type { Context } from '%b/core/context';
import type { InferBackendIn, InferBackendOut } from '%b/core/types';
import type * as defs from '%d/procedures';

export const DeleteTask = async (input: InferBackendIn<typeof defs.DeleteTask>, ctx: Context): Promise<InferBackendOut<typeof defs.DeleteTask>> => {
  console.log('DeleteTask', input);
};
