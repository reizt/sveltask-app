import { env } from '$env/dynamic/private';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { duplicateDynamoDB } from './dup';

describe(duplicateDynamoDB.name, () => {
  it.todo('works', async () => {
    const dynamodb = new DynamoDBClient({});
    const tableName = env.DYNAMODB_TABLE_NAME;
    await duplicateDynamoDB('x', 'y', { dynamodb, tableName });
  });
});
