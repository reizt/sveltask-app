import { env } from '$env/dynamic/private';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import type { Context } from '../context';
import { dbConfig } from '../context/db.config';
import { dynamodbSchema, initDynamodbClient } from './db/dynamodb';
import { NodeHasher } from './hasher/node';
import { SendgridMailer } from './mailer/sendgrid';
import { JwtSigner } from './signer/jwt';

export const initContext = (): Context => {
  const db = initDynamodbClient({
    entities: dbConfig,
    schema: dynamodbSchema,
    ctx: {
      dynamodb: new DynamoDBClient({}),
      tableName: env.DYNAMODB_TABLE_NAME,
    },
  });
  const signer = new JwtSigner(env.JWT_PRIVATE_KEY, env.JWT_PUBLIC_KEY);
  const hasher = new NodeHasher();
  const mailer = new SendgridMailer(env.SENDGRID_API_KEY);
  return { db, signer, hasher, mailer };
};
