import type { TMod } from '#/def/entity';
import type { Tasks } from '#/server/context/database';
import type { Item } from '#/server/utils/types';
import { DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, type AttributeValue } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { makeDeleteCommandInput } from './make-delete-command-input';
import { makePutCommandInput } from './make-put-command-input';
import { makeQuery } from './make-query';
import { globalConfig as g } from './schema';
import type { WithContext } from './types';

type Fn<T extends keyof Tasks._Repository> = WithContext<Tasks._Repository[T]>;

const config = g.entity.task;

export const unmarshallTask = (Item: Record<string, AttributeValue>): TMod.Task => {
  const task: Partial<TMod.Task> = {};
  const unmarshalled = unmarshall(Item);
  for (const key in unmarshalled) {
    const col = key.replace(config.colPrefix, '') as keyof TMod.Task;
    const value = unmarshalled[key]!;
    if (config.dateCols.includes(col as Item<typeof config.dateCols>)) {
      task[col as Item<typeof config.dateCols>] = new Date(value);
    } else {
      task[col] = value;
    }
  }
  return task as TMod.Task;
};

export const findTaskMany: Fn<'findMany'> = async (ctx, args) => {
  const query = makeQuery({
    condition: {
      key: g.index.task.userId.partitionKey,
      value: { S: args.where.userId },
      operator: '=',
    },
  });
  const { ExpressionAttributeNames, ExpressionAttributeValues, KeyConditionExpression } = query;
  const command = new QueryCommand({
    TableName: ctx.tableName,
    IndexName: g.index.task.userId.indexName,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    KeyConditionExpression,
  });
  const { Items } = await ctx.dynamodb.send(command);
  if (Items == null || Items.length === 0) {
    return [];
  }
  return Items.map(unmarshallTask);
};

export const findTaskById: Fn<'findById'> = async (ctx, args) => {
  const command = new GetItemCommand({
    TableName: ctx.tableName,
    Key: {
      [g.partitionKey]: { S: args.where.id },
    },
  });
  const { Item } = await ctx.dynamodb.send(command);
  if (Item == null) {
    return null;
  }
  return unmarshallTask(Item);
};

export const createTask: Fn<'create'> = async (ctx, args) => {
  const task: TMod.Task = {
    id: args.data.id,
    userId: args.data.userId,
    title: args.data.title,
    description: args.data.description,
    status: args.data.status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const commandInput = makePutCommandInput<TMod.Task>({
    tableName: ctx.tableName,
    colPrefix: config.colPrefix,
    data: task,
  });
  const command = new PutItemCommand(commandInput);
  await ctx.dynamodb.send(command);
  return task;
};

export const updateTask: Fn<'update'> = async (ctx, args) => {
  const task = await findTaskById(ctx, { where: { id: args.where.id } });
  if (task == null) {
    throw new Error('Task not found');
  }
  const newTask: TMod.Task = {
    id: task.id,
    userId: args.data.userId ?? task.userId,
    title: args.data.title ?? task.title,
    description: args.data.description ?? task.description,
    status: args.data.status ?? task.status,
    createdAt: task.createdAt,
    updatedAt: new Date(),
  };
  const commandInput = makePutCommandInput<TMod.Task>({
    tableName: ctx.tableName,
    colPrefix: config.colPrefix,
    data: newTask,
  });
  const command = new PutItemCommand(commandInput);
  await ctx.dynamodb.send(command);
  return newTask;
};

export const removeTask: Fn<'remove'> = async (ctx, args) => {
  const task = await findTaskById(ctx, { where: { id: args.where.id } });
  if (task == null) {
    throw new Error('Task not found');
  }
  const commandInput = makeDeleteCommandInput({
    tableName: ctx.tableName,
    partitionKey: args.where.id,
  });
  const command = new DeleteItemCommand(commandInput);
  await ctx.dynamodb.send(command);
  return task;
};
