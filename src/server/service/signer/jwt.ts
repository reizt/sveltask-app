import type { AppSession } from '#/server/context/app-session';
import type { ISigner } from '#/server/context/signer';
import jwt from 'jsonwebtoken';

export class JwtSigner implements ISigner {
  constructor(
    private readonly privateKey: string,
    private readonly publicKey: string,
  ) {}

  async sign(data: AppSession, options?: { expiresIn?: number }): Promise<string> {
    const token = jwt.sign(data, this.privateKey, {
      algorithm: 'ES256',
      expiresIn: options?.expiresIn ?? '1d',
    });
    return token;
  }

  async verify(data: string): Promise<AppSession> {
    try {
      const decoded = jwt.verify(data, this.publicKey, { algorithms: ['ES256'] });
      return decoded as AppSession;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.log('TokenExpiredError');
      }
      if (err instanceof jwt.JsonWebTokenError) {
        console.log('JsonWebTokenError', err);
      }
      if (err instanceof jwt.NotBeforeError) {
        console.log('NotBeforeError');
      }
      throw err;
    }
  }
}
