import type { CollectInput, EntityConfig, InferEntity, PropFilter } from '#/server/context/db.mold';
import { QueryCommand, ScanCommand, type DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { entityNameAttrName, partitionKeyAttrName } from './config';
import { makeQuery, type Condition } from './make-query-expression';
import { marshallValue } from './marshall-value';
import { makePropName, objectRevertPropName } from './separator';
import type { DynamoDbEntitySchemaOf } from './types';

type CollectIn<E extends EntityConfig> = {
  entity: E;
  schema: DynamoDbEntitySchemaOf<E>;
  dynamodb: DynamoDBClient;
  tableName: string;
  args: CollectInput<E>;
};
export const collect = async <E extends EntityConfig>({ entity, schema, dynamodb, tableName, args }: CollectIn<E>) => {
  const conds: Condition[] = [];
  // GSIが張られているプロパティのみクエリ可能
  let queryable = true;
  let indexName: string | undefined;
  for (const key in args.where) {
    const wh = args.where[key];
    if (wh == null) continue;
    const prop = entity[key];
    const propSchema = schema.props[key];
    if (prop == null) continue;
    if (prop.type === 'array' || prop.type === 'object') {
      continue;
    }

    if (propSchema.name === partitionKeyAttrName) {
      // クエリにインデックスが張られていないプロパティが含まれている場合はスキャンする
      // ただし二重でインデックスを指定できないので、すでにインデックスが指定されているのにさらにフィルターを指定する場合はスキャンする
    } else if (propSchema.gsi == null || indexName != null) {
      queryable = false;
    } else {
      indexName = propSchema.gsi.name;
    }

    const attrName = propSchema.name === partitionKeyAttrName ? partitionKeyAttrName : makePropName(schema.name, propSchema.name);

    if ((wh.eq as string | number | boolean | undefined) != null) {
      conds.push({ attributeName: attrName, attributeValue: marshallValue(wh.eq), operator: '=' });
    }
    if ((wh.ne as string | number | boolean | undefined) != null) {
      conds.push({ attributeName: attrName, attributeValue: marshallValue(wh.ne), operator: '<>' });
    }
    if ((wh.in as string[] | number[] | boolean[] | undefined) != null) {
      queryable = false;
      conds.push({ attributeName: attrName, attributeValue: marshallValue(wh.in), operator: 'IN' });
    }
    if (prop.type === 'string') {
      // const stringWh = wh as PropFilter<{ type: 'string' }>;
      // if (stringWh.beginsWith != null) {
      //   conds.push({ attributeName: attrName, attributeValue: marshallValue(stringWh.beginsWith), operator: 'BEGINS_WITH' });
      // }
      // if (stringWh.contains != null) {
      //   queryable = false;
      //   conds.push({ attributeName: attrName, attributeValue: marshallValue(stringWh.contains), operator: 'CONTAINS' });
      // }
    }
    if (prop.type === 'number') {
      const numberWh = wh as PropFilter<{ type: 'number'; name: string }>;
      if (numberWh.gt != null) {
        conds.push({ attributeName: attrName, attributeValue: marshallValue(numberWh.gt), operator: '>' });
      }
      if (numberWh.gte != null) {
        conds.push({ attributeName: attrName, attributeValue: marshallValue(numberWh.gte), operator: '>=' });
      }
      if (numberWh.lt != null) {
        conds.push({ attributeName: attrName, attributeValue: marshallValue(numberWh.lt), operator: '<' });
      }
      if (numberWh.lte != null) {
        conds.push({ attributeName: attrName, attributeValue: marshallValue(numberWh.lte), operator: '<=' });
      }
      // if ((numberWh.between as number | undefined) != null) {
      //   conds.push({ attributeName: attrName, attributeValue: marshallValue(numberWh.between), operator: 'BETWEEN' });
      // }
    }
  }

  if (conds.length === 0) {
    conds.push({
      attributeName: entityNameAttrName,
      attributeValue: marshallValue(schema.name),
      operator: '=',
    });
    indexName = `gsi-${entityNameAttrName}`;
  }

  const { ExpressionAttributeNames, ExpressionAttributeValues, KeyConditionExpression } = makeQuery({
    and: conds.map((condition) => ({ condition })),
  });

  if (queryable && KeyConditionExpression != null) {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      KeyConditionExpression,
    });
    // console.log('Query', command.input);
    const result = await dynamodb.send(command);
    if (result.Items == null) return [];
    return result.Items.map((item) => {
      return objectRevertPropName(schema.name, unmarshall(item)) as InferEntity<E>;
    });
  } else {
    const command = new ScanCommand({
      TableName: tableName,
      IndexName: indexName,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      FilterExpression: KeyConditionExpression,
    });
    // console.log('Scan', command.input);
    const result = await dynamodb.send(command);
    if (result.Items == null) return [];
    return result.Items.map((item) => {
      return objectRevertPropName(schema.name, unmarshall(item)) as InferEntity<E>;
    });
  }
};
