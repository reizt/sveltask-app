import type { EntityConfig } from '#/server/context/db.mold';
import { BatchWriteItemCommand, type DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { partitionKeyAttrName } from './config';
import type { DynamoDbEntitySchemaOf } from './types';

type DelManyInput<E extends EntityConfig> = {
  entity: E;
  schema: DynamoDbEntitySchemaOf<E>;
  dynamodb: DynamoDBClient;
  tableName: string;
  ids: string[];
};

const MAX_REQUEST = 25;

export const delMany = async <E extends EntityConfig>({ entity, schema, dynamodb, tableName, ids }: DelManyInput<E>) => {
  let splitIds = ids.slice(0, MAX_REQUEST);
  while (splitIds.length > 0) {
    const command = new BatchWriteItemCommand({
      RequestItems: {
        [tableName]: splitIds.map((id) => ({
          DeleteRequest: { Key: { [partitionKeyAttrName]: { S: id } } },
        })),
      },
    });
    await dynamodb.send(command);
    ids = ids.slice(MAX_REQUEST);
    splitIds = ids.slice(0, MAX_REQUEST);
  }
};
