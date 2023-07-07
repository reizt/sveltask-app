/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly JWT_PRIVATE_KEY: string;
  readonly JWT_PUBLIC_KEY: string;
  readonly SENDGRID_API_KEY: string;
  readonly MAILER_FROM: string;
  readonly DYNAMODB_TABLE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
