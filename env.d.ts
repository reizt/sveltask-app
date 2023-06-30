/// <reference types="node" />

declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'test' | 'production';
        readonly DATABASE_URL: string;
        readonly JWT_PRIVATE_KEY: string;
        readonly JWT_PUBLIC_KEY: string;
      }
    }
  }
}
