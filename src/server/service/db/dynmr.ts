import { dbConfig } from '#/server/context/db';
import { env } from '$env/dynamic/private';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { createDynmr } from 'dynmr';

export const createDynmrDatabase = () => {
  return createDynmr(dbConfig, {
    dynamodb: new DynamoDBClient({}),
    tableName: env.DYNAMODB_TABLE_NAME,
  });
};
