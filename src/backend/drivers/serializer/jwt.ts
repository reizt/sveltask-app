import type { ISerializer } from '%b/core/context/serializer';
import type { AppSession } from '%b/core/rules/app-session';
import jwt from 'jsonwebtoken';

export class JwtSerializer implements ISerializer {
  constructor(private readonly privateKey: string, private readonly publicKey: string) {}

  async serialize(data: AppSession, options?: { expiresIn?: number }): Promise<string> {
    const token = jwt.sign(data, this.privateKey, {
      algorithm: 'ES256',
      expiresIn: options?.expiresIn ?? '1d',
    });
    return token;
  }

  async deserialize(data: string): Promise<AppSession> {
    try {
      const decoded = jwt.verify(data, this.publicKey, { algorithms: ['ES256'] });
      return decoded as AppSession;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.log('TokenExpiredError');
      }
      if (err instanceof jwt.JsonWebTokenError) {
        console.log('JsonWebTokenError');
      }
      if (err instanceof jwt.NotBeforeError) {
        console.log('NotBeforeError');
      }
      throw err;
    }
  }
}
