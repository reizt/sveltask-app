import type { AttributeValue } from '@aws-sdk/client-dynamodb';

export const marshallValue = (value: any): AttributeValue => {
  if (typeof value === 'string') {
    return { S: value };
  }
  if (typeof value === 'number') {
    return { N: value.toString() };
  }
  if (typeof value === 'boolean') {
    return { BOOL: value };
  }
  if (value instanceof Date) {
    return { S: value.toISOString() };
  }
  if (Array.isArray(value)) {
    return { L: value.map((v) => marshallValue(v)) };
  }
  if (typeof value === 'object') {
    return { M: Object.entries(value).reduce((acc, [k, v]) => ({ ...acc, [k]: marshallValue(v) }), {}) };
  }
  throw new Error(`unsupported type: ${typeof value}`);
};
