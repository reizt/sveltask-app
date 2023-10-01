import type { EntityConfig, Repository } from '#/server/context/db.mold';
import type { DynamoDBContext } from './context';
import { collect } from './method.collect';
import { del } from './method.del';
import { delMany } from './method.delMany';
import { pick } from './method.pick';
import { put } from './method.put';
import { putMany } from './method.putMany';
import type { DynamoDbEntitySchemaOf } from './types';

type RepositoryInit<E extends EntityConfig> = {
  entity: E;
  schema: DynamoDbEntitySchemaOf<E>;
  ctx: DynamoDBContext;
};
export const initRepository = <E extends EntityConfig>({ entity, schema, ctx: { dynamodb, tableName } }: RepositoryInit<E>): Repository<E> => {
  return {
    collect: async (args) => await collect<E>({ entity, schema, dynamodb, tableName, args }),
    pick: async (args) => await pick<E>({ entity, schema, dynamodb, tableName, args }),
    put: async (args) => await put<E>({ entity, schema, dynamodb, tableName, data: args }),
    putMany: async (args) => await putMany<E>({ entity, schema, dynamodb, tableName, data: args }),
    del: async (id) => await del<E>({ entity, schema, dynamodb, tableName, id }),
    delMany: async (ids) => await delMany<E>({ entity, schema, dynamodb, tableName, ids }),
  };
};
