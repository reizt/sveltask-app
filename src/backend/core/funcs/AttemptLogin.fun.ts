import { newCode } from '#/backend/core/modules/identify';
import type { CoreFun } from '#/backend/core/types';

export const AttemptLogin: CoreFun<'AttemptLogin'> = async (input, ctx) => {
  const code = newCode();
  await ctx.mailer.sendCode(input.email, { code });
  const authToken = await ctx.serializer.serialize({ type: 'verify', email: input.email, code });
  return { authToken };
};
