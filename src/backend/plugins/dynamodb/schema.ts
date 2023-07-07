type GlobalConfig = {
  partitionKey: string;
  entity: Record<string, EntityConfig>;
  index: Record<string, Record<string, IndexConfig>>;
};
type EntityConfig = {
  colPrefix: string;
  dateCols: readonly string[];
};
type IndexConfig = {
  indexName: string;
  partitionKey: string;
};

export const globalConfig = {
  partitionKey: 'id',
  entity: {
    user: {
      colPrefix: 'User#',
      dateCols: ['createdAt', 'updatedAt'] as const,
    },
    task: {
      colPrefix: 'Task#',
      dateCols: ['createdAt', 'updatedAt'] as const,
    },
  },
  index: {
    user: {
      email: {
        indexName: 'GSI-User-email',
        partitionKey: 'User#email',
      },
    },
    task: {
      userId: {
        indexName: 'GSI-Task-userId',
        partitionKey: 'Task#userId',
      },
    },
  },
} satisfies GlobalConfig;
