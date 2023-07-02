/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_ROOT: string;
  readonly PUBLIC_API_ROOT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
