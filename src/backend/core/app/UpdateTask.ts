import type { Fun } from '%b/core/types';

export const UpdateTask: Fun<'UpdateTask'> = async (input, ctx) => {
  console.log('UpdateTask', input);
  return {
    id: '1',
    userId: '1',
    title: 'title',
    description: 'description',
    status: 'created',
  };
};
