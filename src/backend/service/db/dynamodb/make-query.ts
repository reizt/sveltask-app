import type { AttributeValue } from '@aws-sdk/client-dynamodb';

export type Conditions = {
  and?: Conditions[];
  or?: Conditions[];
  not?: Conditions;
  condition?: Condition;
};

export type Condition = {
  key: string;
  value: AttributeValue;
  operator: '=';
};
type Output = {
  ExpressionAttributeNames: Record<string, string>;
  ExpressionAttributeValues: Record<string, AttributeValue>;
  KeyConditionExpression: string;
};
export const makeQuery = (conds: Conditions): Output => {
  if (conds.condition != null) {
    const names: Record<string, string> = {};
    const values: Record<string, AttributeValue> = {};
    const keyAlt = `#${conds.condition.key.replace('#', '')}`;
    const valueAlt = `:${conds.condition.key.replace('#', '')}`;
    names[keyAlt] = conds.condition.key;
    values[valueAlt] = conds.condition.value;
    const expression = `${keyAlt} ${conds.condition.operator} ${valueAlt}`;
    return {
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      KeyConditionExpression: expression,
    };
  }

  if (conds.not != null) {
    const query = makeQuery(conds.not);
    return {
      ExpressionAttributeNames: query.ExpressionAttributeNames,
      ExpressionAttributeValues: query.ExpressionAttributeValues,
      KeyConditionExpression: `NOT (${query.KeyConditionExpression})`,
    };
  }

  if (conds.and != null || conds.or != null) {
    let names: Record<string, string> = {};
    let values: Record<string, AttributeValue> = {};
    const expressions: string[] = [];
    for (const cond of (conds.and ?? conds.or)!) {
      const condQuery = makeQuery(cond);
      names = { ...names, ...condQuery.ExpressionAttributeNames };
      values = { ...values, ...condQuery.ExpressionAttributeValues };
      expressions.push(condQuery.KeyConditionExpression);
    }
    const glue = conds.and != null ? ' AND ' : ' OR ';
    const expression = expressions.map((exp) => `(${exp})`).join(glue);
    return {
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      KeyConditionExpression: expression,
    };
  }

  throw new Error('Invalid condition');
};
