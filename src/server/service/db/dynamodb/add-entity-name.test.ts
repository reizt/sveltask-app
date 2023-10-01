import { env } from '$env/dynamic/private';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { addEntityName, getEntityName } from './add-entity-name';

describe(getEntityName.name, () => {
  it('should return undefined if no entity name found', () => {
    expect(getEntityName({})).toBeUndefined();
  });
  it('should return entity name if found', () => {
    expect(getEntityName({ 'foo#bar': { S: 'baz' } })).toBe('foo');
  });
});

describe(addEntityName.name, () => {
  it('works', async () => {
    const dynamodb = new DynamoDBClient({});
    const tableName = env.DYNAMODB_TABLE_NAME;
    await addEntityName({ dynamodb, tableName });
  });
});
