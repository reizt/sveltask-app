import type { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export type DynamodbContext = {
  dynamodb: DynamoDBClient;
  tableName: string;
};
export type WithContext<T> = T extends (args: infer A) => infer R ? (ctx: DynamodbContext, args: A) => R : never;
