import type { Ent } from '#/def/entity';
import { timestamp } from '#/server/context/db.identify';
import type { ServerFun } from '#/server/core/lib/types';
import { newId } from '#/server/core/modules/identify';

export const VerifyCode: ServerFun<'VerifyCode'> = async (input, ctx) => {
  const session = await ctx.signer.verify(input.authToken);

  if (session.type !== 'code') {
    throw new Error('invalid code');
  }

  const isCorrectCode = await ctx.hasher.compare(input.code, session.codeHash);
  if (!isCorrectCode) {
    throw new Error('invalid code');
  }

  let user: Ent.User | null;
  user = await ctx.db.user.pick({
    where: { email: { eq: session.email } },
  });
  if (user == null) {
    user = await ctx.db.user.create({
      id: newId(),
      createdAt: timestamp(),
      updatedAt: timestamp(),
      email: session.email,
      name: '',
    });
  }

  const authToken = await ctx.signer.sign({ type: 'login', userId: user.id });
  return { authToken };
};
