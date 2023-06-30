import type { AppSession } from '../rules/app-session';

export type ISerializer = Readonly<{
  serialize: (data: AppSession, options?: { expiresIn?: number }) => Promise<string>;
  deserialize: (data: string) => Promise<AppSession>;
}>;
