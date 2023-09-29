import type { IHasher } from '#/server/context/hasher';
import { compare, hash } from 'bcrypt';

export class BcryptHasher implements IHasher {
  async hash(data: string): Promise<string> {
    return await hash(data, 10);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return await compare(data, hash);
  }
}
