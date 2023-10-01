export type DatabaseClient<Conf extends Record<string, EntityConfig>> = {
  [E in keyof Conf]: Repository<Conf[E]>;
};
export type Repository<E extends EntityConfig> = {
  collect: (input: CollectInput<E>) => Promise<InferEntity<E>[]>;
  pick: (input: PickInput<E>) => Promise<InferEntity<E> | null>;
  put: (entity: InferEntity<E>) => Promise<InferEntity<E>>;
  putMany: (entities: InferEntity<E>[]) => Promise<InferEntity<E>[]>;
  del: (id: string) => Promise<void>;
  delMany: (ids: string[]) => Promise<void>;
};
export type EntityConfig = Record<string, PropConfig>;

export type CollectInput<E extends EntityConfig> = {
  where?: WhereInput<E>;
};

export type PickInput<E extends EntityConfig> = {
  where: WhereInput<E>;
};

export type WhereInput<E extends EntityConfig> = {
  [K in keyof E as PropFilter<E[K]> extends never ? never : K]?: PropFilter<E[K]>;
};

type comparable = 'string' | 'number' | 'boolean';
export type PropFilter<P extends PropConfig> = P extends { type: comparable }
  ? {
      // DynamoDB supports eq, ne for comparable types
      eq?: InferProp<P>;
      ne?: InferProp<P>;
      in?: InferProp<P>[];
    } & (P extends { type: 'string' }
      ? {
          // DynamoDB supports beginsWith for string
          // beginsWith?: string;
          // contains?: string;
        }
      : P extends { type: 'number' }
      ? {
          // DynamoDB supports gt, gte, lt, lte, between for number
          gt?: InferProp<P>;
          gte?: InferProp<P>;
          lt?: InferProp<P>;
          lte?: InferProp<P>;
          // between?: [InferProp<P>, InferProp<P>];
        }
      : {})
  : never;

export type InferEntity<E extends EntityConfig> = {
  [K in keyof E as E[K]['optional'] extends true ? never : K]: InferProp<E[K]>;
} & {
  [K in keyof E as E[K]['optional'] extends true ? K : never]?: InferProp<E[K]>;
};

export type InferProp<P extends PropConfig> =
  | (P extends { type: 'string' }
      ? P['enum'] extends readonly (infer R)[]
        ? R
        : string
      : P extends { type: 'number' }
      ? number
      : P extends { type: 'boolean' }
      ? boolean
      : P extends { type: 'array' }
      ? InferProp<P['items']>[]
      : P extends { type: 'object' }
      ? {
          [K in keyof P['properties'] as P['properties'][K]['optional'] extends true ? never : K]: InferProp<P['properties'][K]>;
        } & {
          [K in keyof P['properties'] as P['properties'][K]['optional'] extends true ? K : never]?: InferProp<P['properties'][K]>;
        }
      : never)
  | (P extends { optional: true } ? undefined : never);

export type PropConfig = (
  | {
      type: 'string';
      enum?: readonly (string | number | boolean)[];
    }
  | {
      type: 'number' | 'boolean';
    }
  | {
      type: 'array';
      items: PropConfig;
    }
  | {
      type: 'object';
      properties: Record<string, PropConfig>;
    }
) & {
  optional?: true;
};
