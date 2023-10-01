import { BatchWriteItemCommand, ScanCommand, type AttributeValue } from '@aws-sdk/client-dynamodb';
import { entityNameAttrName } from './config';
import type { DynamoDBContext } from './context';

const MAX_REQUEST = 25;

export const addEntityName = async (ctx: DynamoDBContext) => {
  const scanCommand = new ScanCommand({
    TableName: ctx.tableName,
  });
  const scanOutput = await ctx.dynamodb.send(scanCommand);
  if (scanOutput.Items == null || scanOutput.Items.length === 0) {
    return;
  }

  let items = scanOutput.Items.map((item) => {
    const entityName = getEntityName(item);
    if (entityName == null) {
      throw new Error(`Entity name not found in item: ${JSON.stringify(item)}`);
    }
    return {
      PutRequest: {
        Item: {
          ...item,
          [entityNameAttrName]: { S: entityName },
        },
      },
    };
  });

  let splitItems = items.slice(0, MAX_REQUEST);
  while (splitItems.length > 0) {
    const command = new BatchWriteItemCommand({
      RequestItems: {
        [ctx.tableName]: splitItems,
      },
    });
    await ctx.dynamodb.send(command);
    splitItems = items.slice(0, MAX_REQUEST);
    items = items.slice(MAX_REQUEST);
  }
};

export const getEntityName = (item: Record<string, AttributeValue>) => {
  const sampleAttrName = Object.keys(item).find((key) => key.includes('#'));
  return sampleAttrName?.split('#')[0];
};
