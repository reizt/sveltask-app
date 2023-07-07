import { env } from '$env/dynamic/private';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { resetDynamoDB } from './reset';

describe(resetDynamoDB.name, () => {
  it('works', async () => {
    const dynamodb = new DynamoDBClient({});
    const tableName = env.DYNAMODB_TABLE_NAME;
    await resetDynamoDB({ dynamodb, tableName });
    const command = new ScanCommand({
      TableName: tableName,
    });
    const output = await dynamodb.send(command);
    expect(output.Items).toEqual([]);
  });
});
