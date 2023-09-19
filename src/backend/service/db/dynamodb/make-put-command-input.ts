import type { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { globalConfig as g } from './schema';

export type Marshallable<T> = T extends Date
  ? string
  : T extends (infer R)[]
  ? Marshallable<R>[]
  : T extends Record<string, any>
  ? { [K in keyof T]: Marshallable<T[K]> }
  : T;

type Input<T extends Record<string, any>> = {
  tableName: string;
  colPrefix: string;
  data: T;
};
export const makePutCommandInput = <T extends Record<string, any>>({ tableName, colPrefix, data }: Input<T>): PutItemCommandInput => {
  const marshallable: Record<string, any> = {
    [g.partitionKey]: data[g.partitionKey],
  } as any;
  for (const key in data) {
    const col = key.replace(colPrefix, '') as keyof T;
    const colWithPrefix = `${colPrefix}${col as string}`;
    const value = data[key]! as any;
    if (value instanceof Date) {
      marshallable[colWithPrefix] = value.toISOString();
    } else {
      marshallable[colWithPrefix] = value;
    }
  }
  return {
    TableName: tableName,
    Item: marshall(marshallable as Marshallable<T>),
  };
};
