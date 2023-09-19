import type { AppSession } from '#/backend/context/app-session';
import { sleep } from '#/backend/utils/sleep';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JwtSigner } from './jwt';

describe(JwtSigner.name, () => {
  const privateKey = readFileSync(resolve(__dirname, './private.test.key'));
  const publicKey = readFileSync(resolve(__dirname, './public.test.key'));
  const signer = new JwtSigner(privateKey.toString(), publicKey.toString());

  test('value is the same after sign and verify', async () => {
    const session: AppSession = { type: 'login', userId: '123' };
    const token = await signer.sign(session);
    const verifyd = await signer.verify(token);
    if (verifyd.type !== 'login') throw new Error('invalid type');
    expect(verifyd.userId).toEqual(session.userId);
  });

  describe('expiresIn', () => {
    it('should be able to verify before expires', async () => {
      const session: AppSession = { type: 'login', userId: '123' };
      const token = await signer.sign(session, { expiresIn: 1 });
      await signer.verify(token);
    });
    it('should not be able to verify after expires', async () => {
      const session: AppSession = { type: 'login', userId: '123' };
      const token = await signer.sign(session, { expiresIn: 1 });
      await sleep(1001);
      const promise = signer.verify(token);
      await expect(promise).rejects.toThrow(); // expired
    });
  });
});
