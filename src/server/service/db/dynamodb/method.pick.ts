import type { CollectInput, EntityConfig } from '#/server/context/db.mold';
import type { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { collect } from './method.collect';
import type { DynamoDbEntitySchemaOf } from './types';

type PickInput<E extends EntityConfig> = {
  entity: E;
  schema: DynamoDbEntitySchemaOf<E>;
  dynamodb: DynamoDBClient;
  tableName: string;
  args: CollectInput<E>;
};
export const pick = async <E extends EntityConfig>({ entity, schema, dynamodb, tableName, args }: PickInput<E>) => {
  const results = await collect({ entity, schema, dynamodb, tableName, args: { where: args.where } });
  return results[0] ?? null;
};
