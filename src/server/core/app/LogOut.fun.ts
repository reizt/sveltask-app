import type { ServerFun } from '#/server/core/lib/types';

export const LogOut: ServerFun<'LogOut'> = async (input, ctx) => {
  return { authToken: '' };
};
