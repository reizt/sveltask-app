import type { AppSession } from './app-session';

export type ISigner = Readonly<{
  sign: (data: AppSession, options?: { expiresIn?: number }) => Promise<string>;
  verify: (data: string) => Promise<AppSession>;
}>;
