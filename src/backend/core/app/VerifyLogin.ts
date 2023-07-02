import type { Fun } from '%b/core/types';
import type { TMod } from '%d/model';
import { newId } from '../funcs/identify';

export const VerifyLogin: Fun<'VerifyLogin'> = async (input, ctx) => {
  const session = await ctx.serializer.deserialize(input.authToken);
  if (session.type !== 'verify' || session.code !== input.code) {
    throw new Error('invalid code');
  }

  let user: TMod.User | null;
  user = await ctx.db.users.findFirst({
    where: { email: session.email },
  });
  if (user == null) {
    user = await ctx.db.users.create({
      data: {
        id: newId(),
        email: session.email,
        name: '',
      },
    });
  }

  const authToken = await ctx.serializer.serialize({ type: 'login', userId: user.id });
  return { authToken };
};
