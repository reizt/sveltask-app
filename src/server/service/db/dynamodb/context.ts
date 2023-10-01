import type { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export type DynamoDBContext = {
  dynamodb: DynamoDBClient;
  tableName: string;
};
