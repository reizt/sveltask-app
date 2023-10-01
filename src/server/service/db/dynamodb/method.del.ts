import type { EntityConfig } from '#/server/context/db.mold';
import { DeleteItemCommand, type DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { partitionKeyAttrName } from './config';
import type { DynamoDbEntitySchemaOf } from './types';

type DelInput<E extends EntityConfig> = {
  entity: E;
  schema: DynamoDbEntitySchemaOf<E>;
  dynamodb: DynamoDBClient;
  tableName: string;
  id: string;
};
export const del = async <E extends EntityConfig>({ entity, dynamodb, tableName, id }: DelInput<E>) => {
  const command = new DeleteItemCommand({
    TableName: tableName,
    Key: {
      [partitionKeyAttrName]: { S: id },
    },
  });
  // console.log('Delete', command.input);
  await dynamodb.send(command);
};
