import type { CoreFun } from '#/backend/core/types';

export const LogOut: CoreFun<'LogOut'> = async (input, ctx) => {
  return { authToken: '' };
};
