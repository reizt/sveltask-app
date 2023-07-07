import { createApp } from '#/backend/core/create-app';
import { createDynamoDbPlugin } from '#/backend/plugins/dynamodb';
import { SendgridMailer } from '#/backend/plugins/mailer/sendgrid';
import { JwtSerializer } from '#/backend/plugins/serializer/jwt';
import { env } from '$env/dynamic/private';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const injectDeps = () => {
  const db = createDynamoDbPlugin({
    dynamodb: new DynamoDBClient({}),
    tableName: env.DYNAMODB_TABLE_NAME,
  });
  const serializer = new JwtSerializer(env.JWT_PRIVATE_KEY, env.JWT_PUBLIC_KEY);
  const mailer = new SendgridMailer(env.SENDGRID_API_KEY);
  return createApp({ db, serializer, mailer });
};
export const app = injectDeps();
