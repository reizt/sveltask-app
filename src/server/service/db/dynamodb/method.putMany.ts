import type { EntityConfig, InferEntity } from '#/server/context/db.mold';
import { BatchWriteItemCommand, type DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { partitionKeyAttrName } from './config';
import type { DynamoDbEntitySchemaOf } from './types';

type PutManyInput<E extends EntityConfig> = {
  entity: E;
  schema: DynamoDbEntitySchemaOf<E>;
  dynamodb: DynamoDBClient;
  tableName: string;
  data: InferEntity<E>[];
};

const MAX_REQUEST = 25;

export const putMany = async <E extends EntityConfig>({ entity, schema, dynamodb, tableName, data }: PutManyInput<E>) => {
  const makeItemInput = (item: InferEntity<E>) => {
    item = deleteUndefinedKeys(item); // Remove undefined values
    const marshallable: Record<string, any> = {
      [partitionKeyAttrName]: item[partitionKeyAttrName as keyof typeof item],
    };
    for (const key in item) {
      const colWithPrefix = `${schema.name}#${key}`;
      const value = item[key as keyof typeof item];
      marshallable[colWithPrefix] = value instanceof Date ? value.toISOString() : value;
    }
    return marshall(marshallable, { removeUndefinedValues: true });
  };
  let dataCopy = [...data];
  let splitData = dataCopy.slice(0, MAX_REQUEST);
  while (splitData.length > 0) {
    const command = new BatchWriteItemCommand({
      RequestItems: {
        [tableName]: dataCopy.map((item) => ({
          PutRequest: { Item: makeItemInput(item) },
        })),
      },
    });
    await dynamodb.send(command);
    dataCopy = dataCopy.slice(MAX_REQUEST);
    splitData = dataCopy.slice(0, MAX_REQUEST);
  }
  return [...data];
};

const deleteUndefinedKeys = <T extends Record<string, any>>(obj: T): T => {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};
