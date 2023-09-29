import { env } from '$env/dynamic/private';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import type { Context } from './context';
import { createApp } from './core/app';
import { createDynamoDbPlugin } from './service/db/dynamodb';
import { BcryptHasher } from './service/hasher/bcrypt';
import { SendgridMailer } from './service/mailer/sendgrid';
import { JwtSigner } from './service/signer/jwt';

const initContext = (): Context => {
  const db = createDynamoDbPlugin({
    dynamodb: new DynamoDBClient({}),
    tableName: env.DYNAMODB_TABLE_NAME,
  });
  const signer = new JwtSigner(env.JWT_PRIVATE_KEY, env.JWT_PUBLIC_KEY);
  const hasher = new BcryptHasher();
  const mailer = new SendgridMailer(env.SENDGRID_API_KEY);
  return { db, signer, hasher, mailer };
};

const ctx = initContext();
export const app = createApp(ctx);
