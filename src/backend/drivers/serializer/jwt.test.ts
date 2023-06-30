import type { AppSession } from '%b/core/rules/app-session';
import { sleep } from '%u/sleep';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JwtSerializer } from './jwt';

describe(JwtSerializer.name, () => {
  const privateKey = readFileSync(resolve(__dirname, './private.test.key'));
  const publicKey = readFileSync(resolve(__dirname, './public.test.key'));
  const serializer = new JwtSerializer(privateKey.toString(), publicKey.toString());

  test('value is the same after serialize and deserialize', async () => {
    const session: AppSession = { userId: '123' };
    const token = await serializer.serialize(session);
    const deserialized = await serializer.deserialize(token);
    expect(deserialized.userId).toEqual(session.userId);
  });

  describe('expiresIn', () => {
    it('should be able to deserialize before expires', async () => {
      const session: AppSession = { userId: '123' };
      const token = await serializer.serialize(session, { expiresIn: 1 });
      await serializer.deserialize(token);
    });
    it('should not be able to deserialize after expires', async () => {
      const session: AppSession = { userId: '123' };
      const token = await serializer.serialize(session, { expiresIn: 1 });
      await sleep(1001);
      const promise = serializer.deserialize(token);
      await expect(promise).rejects.toThrow(); // expired
    });
  });
});
