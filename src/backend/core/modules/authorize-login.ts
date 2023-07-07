import type { Context } from '#/backend/context';

type Input = {
  authToken: string;
};
export const authorizeLogin = async (input: Input, ctx: Context) => {
  const session = await ctx.serializer.deserialize(input.authToken);
  if (session.type !== 'login') {
    throw new Error('invalid session type');
  }
  const user = await ctx.db.users.findById({
    where: { id: session.userId },
  });
  if (user == null) {
    throw new Error('user not found');
  }
  return user;
};
