import { BatchWriteItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { globalConfig as g } from './schema';
import type { DynamodbContext } from './types';

export const resetDynamoDB = async (ctx: DynamodbContext) => {
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
            [g.partitionKey]: item[g.partitionKey]!,
          },
        },
      })),
    },
  });
  await ctx.dynamodb.send(command);
};
