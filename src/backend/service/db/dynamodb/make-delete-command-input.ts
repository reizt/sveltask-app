import type { DeleteItemCommandInput } from '@aws-sdk/client-dynamodb';
import { globalConfig as g } from './schema';

type Input = {
  tableName: string;
  partitionKey: string;
};

export const makeDeleteCommandInput = (input: Input): DeleteItemCommandInput => {
  return {
    TableName: input.tableName,
    Key: {
      [g.partitionKey]: { S: input.partitionKey },
    },
  };
};
