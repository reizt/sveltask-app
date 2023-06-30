import type { Fun } from '%b/core/types';

export const CreateTask: Fun<'CreateTask'> = async (input, ctx) => {
  console.log('CreateTask', input);
  return {
    id: '1',
    userId: '1',
    title: 'title',
    description: 'description',
    status: 'created',
  };
};
