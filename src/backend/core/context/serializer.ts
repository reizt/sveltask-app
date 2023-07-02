import type { AppSession } from './app-session';

export type ISerializer = Readonly<{
  serialize: (data: AppSession, options?: { expiresIn?: number }) => Promise<string>;
  deserialize: (data: string) => Promise<AppSession>;
}>;
