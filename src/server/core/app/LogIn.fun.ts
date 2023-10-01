import type { ServerFun } from '../lib/types';

export const LogIn: ServerFun<'LogIn'> = async (input, ctx) => {
  const user = await ctx.db.user.pick({
    where: { email: { eq: input.email } },
  });

  if (user?.passwordDigest == null) {
    throw new Error('invalid email or password');
  }

  const isCorrectPassword = await ctx.hasher.compare(input.password, user.passwordDigest);
  if (!isCorrectPassword) {
    throw new Error('invalid email or password');
  }

  const token = await ctx.signer.sign({ type: 'login', userId: user.id });
  return { authToken: token };
};
