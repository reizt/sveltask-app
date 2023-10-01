import { BatchWriteItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { partitionKeyAttrName } from './config';
import type { DynamoDBContext } from './context';

export const resetDynamoDB = async (ctx: DynamoDBContext) => {
  const scanCommand = new ScanCommand({
    TableName: ctx.tableName,
  });
  const scanOutput = await ctx.dynamodb.send(scanCommand);
  if (scanOutput.Items == null || scanOutput.Items.length === 0) {
    return;
  }
  const command = new BatchWriteItemCommand({
    RequestItems: {
      [ctx.tableName]: scanOutput.Items.map((item) => ({
        DeleteRequest: {
          Key: {
            [partitionKeyAttrName]: item[partitionKeyAttrName]!,
          },
        },
      })),
    },
  });
  await ctx.dynamodb.send(command);
};
