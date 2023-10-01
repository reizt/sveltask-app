import type { IHasher } from '#/server/context/hasher';
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';

export class NodeHasher implements IHasher {
  private readonly saltLength = 32;
  private readonly keyLength = 64;

  async hash(plaintext: string): Promise<string> {
    const salt = randomBytes(this.saltLength).toString('hex');
    return await new Promise((resolve, reject) => {
      scrypt(plaintext, salt, this.keyLength, async (err, derivedKey) => {
        if (err != null) reject(err);
        resolve(`${salt}$${derivedKey.toString('hex')}`);
      });
    });
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    const [salt, originalHash] = hash.split('$');
    if (salt == null || originalHash == null) return false;
    return await new Promise((resolve, reject) => {
      scrypt(plaintext, salt, this.keyLength, async (err, derivedKey) => {
        if (err != null) reject(err);
        const newHash = derivedKey.toString('hex');
        const isEqual = timingSafeEqual(Buffer.from(newHash, 'hex'), Buffer.from(originalHash, 'hex'));
        resolve(isEqual);
      });
    });
  }
}
