/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

type Entity = {
  name: string;
  props: Record<string, Prop>;
};

type Prop = {
  name: string;
} & (
  | {
      type: 'string' | 'number' | 'boolean';
      index?: {
        name: string;
      };
    }
  | {
      type: 'array';
      items: Prop;
    }
  | {
      type: 'object';
      properties: Record<string, Prop>;
    }
);

type InferProp<P extends Prop> = P extends { type: 'string' }
  ? string
  : P extends { type: 'number' }
  ? number
  : P extends { type: 'boolean' }
  ? boolean
  : P extends { type: 'array' }
  ? InferProp<P['items']>[]
  : P extends { type: 'object' }
  ? { [K in keyof P['properties']]: InferProp<P['properties'][K]> }
  : never;

type InferEntity<E extends Entity> = {
  [K in keyof E['props']]: InferProp<E['props'][K]>;
};

export type ClientConfig = {
  dynamodb: DynamoDBClient;
  tableName: string;
  entities: {
    [key: string]: Entity;
  };
};

type Repository<E extends Entity> = {
  findMany: (props: FindManyArgs<E>) => Promise<InferEntity<E>[]>;
  findFirst: (props: FindManyArgs<E>) => Promise<InferEntity<E> | null>;
  put: (props: InferEntity<E>) => Promise<void>;
  del: (id: string) => Promise<void>;
};
type Client<Cnf extends ClientConfig> = {
  [E in keyof Cnf['entities']]: Repository<Cnf['entities'][E]>;
};

type QueryInput<P extends Prop> = P extends { type: 'string' | 'number' | 'boolean' }
  ? {
      eq?: InferProp<P>;
      ne?: InferProp<P>;
      gt?: InferProp<P>;
      gte?: InferProp<P>;
      lt?: InferProp<P>;
      lte?: InferProp<P>;
      between?: [InferProp<P>, InferProp<P>];
    }
  : never;
type WhereInput<P extends Prop> = P extends { type: 'string' | 'number' | 'boolean' }
  ? QueryInput<P> &
      (P extends { type: 'string' }
        ? {
            beginsWith?: string;
          }
        : {})
  : never;

type FindManyArgs<E extends Entity> = {
  where?: {
    [K in keyof E['props'] as WhereInput<E['props'][K]> extends never ? never : K]?: WhereInput<E['props'][K]>;
  };
};

export const createClient = <Cnf extends ClientConfig>({ dynamodb, tableName, entities }: Cnf): Client<Cnf> => {
  const client: Client<Cnf> = {} as any;

  for (const entity in entities) {
    client[entity as keyof Cnf['entities']] = createRepository(entities[entity]! as Cnf['entities'][keyof Cnf['entities']], dynamodb, tableName);
  }

  return client;
};

const createRepository = <E extends Entity>(entity: E, dynamodb: DynamoDBClient, tableName: string): Repository<E> => {
  return {
    findMany: async ({ where }) => {
      for (const key in where) {
        const wh = where[key];
        if (wh == null) continue;
        const prop = entity.props[key];
        if (prop == null) continue;
        //
      }
      return [];
    },
    findFirst: async () => {
      return null;
    },
    put: async () => {},
    del: async () => {},
  };
};

export const client = createClient({
  dynamodb: new DynamoDBClient({}),
  tableName: 'test',
  entities: {
    user: {
      name: 'user',
      props: {
        id: { name: 'id', type: 'string' },
        name: { name: 'name', type: 'string' },
        age: { name: 'age', type: 'number' },
        isAdult: { name: 'isAdult', type: 'boolean' },
        tags: { name: 'tags', type: 'array', items: { name: 'tag', type: 'string' } },
        address: {
          name: 'address',
          type: 'object',
          properties: {
            country: { name: 'country', type: 'string' },
            city: { name: 'city', type: 'string' },
            street: { name: 'street', type: 'string' },
          },
        },
      },
    },
  },
});

// client.user.findFirst({
//   where: {},
// });
