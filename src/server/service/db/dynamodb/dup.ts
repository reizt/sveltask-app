import { BatchWriteItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import type { DynamoDBContext } from './context';

export const duplicateDynamoDB = async (tableX: string, tableY: string, ctx: DynamoDBContext) => {
  const scanCommand = new ScanCommand({
    TableName: tableX,
  });
  const scanOutput = await ctx.dynamodb.send(scanCommand);
  if (scanOutput.Items == null || scanOutput.Items.length === 0) {
    return;
  }
  const MAX_REQUEST = 25;
  let items = scanOutput.Items;
  let splitItems = items.slice(0, MAX_REQUEST);
  while (splitItems.length > 0) {
    const command = new BatchWriteItemCommand({
      RequestItems: {
        tableY: splitItems.map((item) => ({
          PutRequest: {
            Item: {
              ...item,
            },
          },
        })),
      },
    });
    await ctx.dynamodb.send(command);
    items = items.slice(MAX_REQUEST);
    splitItems = items.slice(0, MAX_REQUEST);
  }
};
