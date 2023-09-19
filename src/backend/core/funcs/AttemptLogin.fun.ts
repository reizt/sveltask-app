import { newCode } from '#/backend/core/modules/identify';
import type { CoreFun } from '#/backend/core/types';

export const AttemptLogin: CoreFun<'AttemptLogin'> = async (input, ctx) => {
  const code = newCode();
  await ctx.mailer.sendCode(input.email, { code });
  const codeHash = await ctx.hasher.hash(code);
  const authToken = await ctx.signer.sign({ type: 'verify', email: input.email, codeHash });
  return { authToken };
};
