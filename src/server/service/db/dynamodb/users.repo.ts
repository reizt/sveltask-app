import type { TMod } from '#/def/entity';
import type { Users } from '#/server/context/database';
import type { Item } from '#/server/utils/types';
import { DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, type AttributeValue } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { makeDeleteCommandInput } from './make-delete-command-input';
import { makePutCommandInput } from './make-put-command-input';
import { makeQuery } from './make-query';
import { globalConfig as g } from './schema';
import type { WithContext } from './types';

type Fn<T extends keyof Users._Repository> = WithContext<Users._Repository[T]>;

const config = g.entity.user;

export const unmarshallUser = (Item: Record<string, AttributeValue>): TMod.User => {
  const user: Partial<TMod.User> = {};
  const unmarshalled = unmarshall(Item);
  for (const key in unmarshalled) {
    const col = key.replace(config.colPrefix, '') as keyof TMod.User;
    const value = unmarshalled[key]!;
    if (config.dateCols.includes(col as Item<typeof config.dateCols>)) {
      user[col as Item<typeof config.dateCols>] = new Date(value);
    } else {
      user[col] = value;
    }
  }
  return user as TMod.User;
};

export const findUserById: Fn<'findById'> = async (ctx, args) => {
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
  return unmarshallUser(Item);
};

export const findUserByEmail: Fn<'findByEmail'> = async (ctx, args) => {
  const query = makeQuery({
    condition: {
      key: g.index.user.email.partitionKey,
      value: { S: args.where.email },
      operator: '=',
    },
  });
  const { ExpressionAttributeNames, ExpressionAttributeValues, KeyConditionExpression } = query;
  const command = new QueryCommand({
    TableName: ctx.tableName,
    IndexName: g.index.user.email.indexName,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    KeyConditionExpression,
  });
  const { Items } = await ctx.dynamodb.send(command);
  if (Items == null || Items.length === 0) {
    return null;
  }
  return unmarshallUser(Items[0]!);
};

export const createUser: Fn<'create'> = async (ctx, args) => {
  const user: TMod.User = {
    id: args.data.id,
    name: args.data.name,
    email: args.data.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const commandInput = makePutCommandInput<TMod.User>({
    tableName: ctx.tableName,
    colPrefix: config.colPrefix,
    data: user,
  });
  const command = new PutItemCommand(commandInput);
  await ctx.dynamodb.send(command);
  return user;
};

export const updateUser: Fn<'update'> = async (ctx, args) => {
  const user = await findUserById(ctx, { where: { id: args.where.id } });
  if (user == null) {
    throw new Error('User not found');
  }
  const newUser: TMod.User = {
    id: user.id,
    name: args.data.name ?? user.name,
    email: args.data.email ?? user.email,
    createdAt: user.createdAt,
    updatedAt: new Date(),
  };
  const commandInput = makePutCommandInput<TMod.User>({
    tableName: ctx.tableName,
    colPrefix: config.colPrefix,
    data: newUser,
  });
  const command = new PutItemCommand(commandInput);
  await ctx.dynamodb.send(command);
  return newUser;
};

export const removeUser: Fn<'remove'> = async (ctx, args) => {
  const user = await findUserById(ctx, { where: { id: args.where.id } });
  if (user == null) {
    throw new Error('User not found');
  }
  const commandInput = makeDeleteCommandInput({
    tableName: ctx.tableName,
    partitionKey: args.where.id,
  });
  const command = new DeleteItemCommand(commandInput);
  await ctx.dynamodb.send(command);
  return user;
};
