import type { EntityConfig, InferEntity } from '#/server/context/db.mold';
import { PutItemCommand, type DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { partitionKeyAttrName } from './config';
import type { DynamoDbEntitySchemaOf } from './types';

type PutInput<E extends EntityConfig> = {
  entity: E;
  schema: DynamoDbEntitySchemaOf<E>;
  dynamodb: DynamoDBClient;
  tableName: string;
  data: InferEntity<E>;
};
export const put = async <E extends EntityConfig>({ entity, schema, dynamodb, tableName, data }: PutInput<E>) => {
  const marshallable: Record<string, any> = {
    [partitionKeyAttrName]: data[partitionKeyAttrName as keyof typeof data],
    entityName: schema.name,
  };
  for (const key in data) {
    const colWithPrefix = `${schema.name}#${key}`;
    const value = data[key as keyof typeof data];
    marshallable[colWithPrefix] = value instanceof Date ? value.toISOString() : value;
  }
  const command = new PutItemCommand({
    TableName: tableName,
    Item: marshall(marshallable, { removeUndefinedValues: true }),
  });
  // console.log('Put', command.input);
  await dynamodb.send(command);
  return { ...data };
};
