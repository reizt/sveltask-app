import type { TMod } from '#/def/entity';
import { env } from '$env/dynamic/private';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import type { Marshallable } from './make-put-command-input';
import type { DynamodbContext } from './types';
import { findUserByEmail, findUserById, unmarshallUser } from './users.repo';

describe('users repository', () => {
  const ctx: DynamodbContext = {
    dynamodb: new DynamoDBClient({}),
    tableName: env.DYNAMODB_TABLE_NAME,
  };

  describe(unmarshallUser.name, () => {
    it('should unmarshall cols', () => {
      const expectedUser: TMod.User = {
        id: 'xxx',
        name: 'John Doe',
        email: 'foo@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const marshallableUser: Marshallable<TMod.User> = {
        id: expectedUser.id,
        name: expectedUser.name,
        email: expectedUser.email,
        createdAt: expectedUser.createdAt.toISOString(),
        updatedAt: expectedUser.updatedAt.toISOString(),
      };
      const Item = marshall(marshallableUser);
      const user = unmarshallUser(Item);
      expect(user).toEqual(expectedUser);
    });
  });
  describe(findUserById.name, () => {
    it('should return null if user not found', async () => {
      const user = await findUserById(ctx, { where: { id: 'not-found' } });
      expect(user).toBeNull();
    });
  });
  describe(findUserByEmail.name, () => {
    it('should return null if user not found', async () => {
      const user = await findUserByEmail(ctx, { where: { email: 'not-found@not-found.com' } });
      expect(user).toBeNull();
    });
  });
});
