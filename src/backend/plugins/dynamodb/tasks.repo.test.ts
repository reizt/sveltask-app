import type { TMod } from '#/defs/entity';
import { env } from '$env/dynamic/private';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import type { Marshallable } from './make-put-command-input';
import { findTaskById, unmarshallTask } from './tasks.repo';
import type { DynamodbContext } from './types';

describe('tasks repository', () => {
  const ctx: DynamodbContext = {
    dynamodb: new DynamoDBClient({}),
    tableName: env.DYNAMODB_TABLE_NAME,
  };

  describe(unmarshallTask.name, () => {
    it('should unmarshall cols', () => {
      const expectedTask: TMod.Task = {
        id: 'xxx',
        userId: 'yyy',
        title: 'John Doe',
        description: 'foo@example.com',
        status: 'created',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const marshallableTask: Marshallable<TMod.Task> = {
        id: expectedTask.id,
        userId: expectedTask.userId,
        title: expectedTask.title,
        description: expectedTask.description,
        status: expectedTask.status,
        createdAt: expectedTask.createdAt.toISOString(),
        updatedAt: expectedTask.updatedAt.toISOString(),
      };
      const Item = marshall(marshallableTask);
      const task = unmarshallTask(Item);
      expect(task).toEqual(expectedTask);
    });
  });
  describe(findTaskById.name, () => {
    it('should return null if task not found', async () => {
      const task = await findTaskById(ctx, { where: { id: 'not-found' } });
      expect(task).toBeNull();
    });
  });
});
