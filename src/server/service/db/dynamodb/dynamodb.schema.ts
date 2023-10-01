import type { dbConfig } from '#/server/context/db.config';
import type { DynamoDbDatabaseSchemaOf } from './types';

export const dynamodbSchema: DynamoDbDatabaseSchemaOf<typeof dbConfig> = {
  user: {
    name: 'user',
    props: {
      id: { name: 'id' },
      createdAt: { name: 'createdAt' },
      updatedAt: { name: 'updatedAt' },
      email: { name: 'email', gsi: { name: 'gsi-user-email' } },
      name: { name: 'name' },
      passwordDigest: { name: 'passwordDigest' },
    },
  },
  task: {
    name: 'task',
    props: {
      id: { name: 'id' },
      createdAt: { name: 'createdAt' },
      updatedAt: { name: 'updatedAt' },
      userId: { name: 'userId', gsi: { name: 'gsi-task-userId' } },
      title: { name: 'title' },
      description: { name: 'description' },
      status: { name: 'status' },
    },
  },
};
