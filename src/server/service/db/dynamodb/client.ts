import type { DatabaseClient, EntityConfig } from '#/server/context/db.mold';
import type { DynamoDBContext } from './context';
import { initRepository } from './repository';
import type { DynamoDbDatabaseSchemaOf, DynamoDbEntitySchemaOf } from './types';

type ClientInit<Es extends Record<string, EntityConfig>> = {
  entities: Es;
  schema: DynamoDbDatabaseSchemaOf<Es>;
  ctx: DynamoDBContext;
};
export const initDynamodbClient = <Es extends Record<string, EntityConfig>>({ entities, schema, ctx }: ClientInit<Es>): DatabaseClient<Es> => {
  const client: DatabaseClient<Es> = {} as any;

  for (const entityName in entities) {
    const entity = entities[entityName]!;
    const entitySchema = schema[entityName] as DynamoDbEntitySchemaOf<typeof entity>;
    client[entityName] = initRepository({ entity, schema: entitySchema, ctx });
  }

  return client;
};
