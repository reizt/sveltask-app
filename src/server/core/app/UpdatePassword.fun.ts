import type { ServerFun } from '../lib/types';
import { authenticateToken } from '../modules/authenticate-token';

export const UpdatePassword: ServerFun<'UpdatePassword'> = async (input, ctx) => {
  const currentUser = await authenticateToken({ authToken: input.authToken }, ctx);

  const passwordDigest = await ctx.hasher.hash(input.password);
  await ctx.db.user.update({
    ...currentUser,
    passwordDigest,
  });
};
