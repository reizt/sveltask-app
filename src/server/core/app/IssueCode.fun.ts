import type { ServerFun } from '#/server/core/lib/types';
import { newCode } from '#/server/core/modules/identify';

export const IssueCode: ServerFun<'IssueCode'> = async (input, ctx) => {
  const code = newCode();
  await ctx.mailer.sendCode(input.email, { code });
  const codeHash = await ctx.hasher.hash(code);
  const authToken = await ctx.signer.sign({ type: 'verify', email: input.email, codeHash });
  return { authToken };
};
