import type { Context } from '#/server/context';

type Input = {
  authToken: string;
};
export const authenticateToken = async (input: Input, ctx: Context) => {
  const session = await ctx.signer.verify(input.authToken);
  if (session.type !== 'login') {
    throw new Error('invalid session type');
  }

  const user = await ctx.db.user.pick({
    where: { id: { eq: session.userId } },
  });

  if (user == null) {
    throw new Error('user not found');
  }

  return user;
};
