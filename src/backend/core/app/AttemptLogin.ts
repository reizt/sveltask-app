import type { Fun } from '%b/core/types';
import { newCode } from '../funcs/identify';

export const AttemptLogin: Fun<'AttemptLogin'> = async (input, ctx) => {
  const code = newCode();
  await ctx.mailer.sendCode(input.email, { code });
  const authToken = await ctx.serializer.serialize({ type: 'verify', email: input.email, code });
  return { authToken };
};
