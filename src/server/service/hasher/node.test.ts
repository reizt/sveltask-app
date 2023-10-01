import { NodeHasher } from './node';

describe(NodeHasher.name, () => {
  const hasher = new NodeHasher();

  it('generates a valid hash', async () => {
    const str = 'password';
    const hash = await hasher.hash(str);
    const isValid = await hasher.compare(str, hash);
    expect(isValid).toBe(true);
  });
});
