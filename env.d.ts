/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly JWT_PRIVATE_KEY: string;
  readonly JWT_PUBLIC_KEY: string;
  readonly SENDGRID_API_KEY: string;
  readonly MAILER_FROM: string;
  readonly PRIVATE_API_KEY: string;
  readonly DRIZZLE_OUTDIR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
