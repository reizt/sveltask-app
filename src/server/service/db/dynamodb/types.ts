import type { EntityConfig } from '#/server/context/db.mold';

export type DynamoDbDatabaseSchemaOf<T extends Record<string, EntityConfig>> = {
  [K in keyof T]: DynamoDbEntitySchemaOf<T[K]>;
};

export type DynamoDbEntitySchemaOf<E extends EntityConfig> = {
  name: string;
  props: {
    [P in keyof E]: DynamoDbPropSchema;
  };
};

export type DynamoDbPropSchema = {
  name: string;
  gsi?: {
    name: string;
  };
};
