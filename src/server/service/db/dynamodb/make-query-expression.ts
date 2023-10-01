import type { AttributeValue } from '@aws-sdk/client-dynamodb';

export type Conditions = {
  and?: Conditions[];
  or?: Conditions[];
  not?: Conditions;
  condition?: Condition;
};

export type Condition = {
  attributeName: string;
  attributeValue: AttributeValue;
  // operator: '=' | '<>' | '<' | '<=' | '>' | '>=' | 'BETWEEN' | 'IN' | 'attribute_exists' | 'attribute_not_exists' | 'begins_with' | 'contains' | 'size';
  operator: '=' | '<>' | '<' | '<=' | '>' | '>=' | 'IN';
};
type Output = {
  ExpressionAttributeNames: Record<string, string> | undefined;
  ExpressionAttributeValues: Record<string, AttributeValue> | undefined;
  KeyConditionExpression: string | undefined;
};
export const makeQuery = (conds: Conditions): Output => {
  if (conds.condition != null) {
    const names: Record<string, string> = {};
    const values: Record<string, AttributeValue> = {};
    const operator = conds.condition.operator;
    const keyAlt = `#${conds.condition.attributeName.replace('#', '_')}`;

    let expression: string;
    if (operator === 'IN') {
      const valueAlts: string[] = [];
      const valueAltPrefix = `:${conds.condition.attributeName.replace('#', '_')}`;
      names[keyAlt] = conds.condition.attributeName;
      const valueList = conds.condition.attributeValue.L ?? [];
      for (const [i, element] of valueList.entries()) {
        const valueAlt = `${valueAltPrefix}_${i}`;
        values[valueAlt] = element!;
        valueAlts.push(valueAlt);
      }
      expression = `${keyAlt} IN (${valueAlts.join(', ')})`;
    } else {
      const valueAlt = `:${conds.condition.attributeName.replace('#', '_')}`;
      names[keyAlt] = conds.condition.attributeName;
      values[valueAlt] = conds.condition.attributeValue;
      expression = `${keyAlt} ${operator} ${valueAlt}`;
    }

    return disallowEmptyObject({
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      KeyConditionExpression: expression,
    });
  }

  if (conds.not != null) {
    const query = makeQuery(conds.not);
    if (query.KeyConditionExpression != null) {
      return disallowEmptyObject({
        ExpressionAttributeNames: query.ExpressionAttributeNames,
        ExpressionAttributeValues: query.ExpressionAttributeValues,
        KeyConditionExpression: `NOT (${query.KeyConditionExpression})`,
      });
    }
  }

  if (conds.and != null || conds.or != null) {
    let names: Record<string, string> = {};
    let values: Record<string, AttributeValue> = {};
    const expressions: string[] = [];
    for (const cond of (conds.and ?? conds.or)!) {
      const condQuery = makeQuery(cond);
      names = { ...names, ...condQuery.ExpressionAttributeNames };
      values = { ...values, ...condQuery.ExpressionAttributeValues };
      if (condQuery.KeyConditionExpression != null) {
        expressions.push(condQuery.KeyConditionExpression);
      }
    }
    const glue = conds.and != null ? ' AND ' : ' OR ';
    const expression = expressions.map((exp) => `(${exp})`).join(glue);
    return disallowEmptyObject({
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      KeyConditionExpression: expression,
    });
  }

  return {
    ExpressionAttributeNames: undefined,
    ExpressionAttributeValues: undefined,
    KeyConditionExpression: undefined,
  };
};

const disallowEmptyObject = (output: Output) => {
  if (output.ExpressionAttributeNames != null && Object.keys(output.ExpressionAttributeNames).length === 0) {
    output.ExpressionAttributeNames = undefined;
  }
  if (output.ExpressionAttributeValues != null && Object.keys(output.ExpressionAttributeValues).length === 0) {
    output.ExpressionAttributeValues = undefined;
  }
  if (output.KeyConditionExpression != null && output.KeyConditionExpression.length === 0) {
    output.KeyConditionExpression = undefined;
  }
  return { ...output };
};
