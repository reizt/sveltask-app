import type { Fun } from '%b/core/types';

export const DeleteTask: Fun<'DeleteTask'> = async (input, ctx) => {
  console.log('DeleteTask', input);
};
