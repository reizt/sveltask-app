import { makeQuery, type Conditions } from './make-query-expression';

describe(makeQuery.name, () => {
  it('should return empty query with empty conditions', () => {
    const conds: Conditions = {};
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual(undefined);
    expect(query.ExpressionAttributeValues).toEqual(undefined);
    expect(query.KeyConditionExpression).toEqual(undefined);
  });
  it('should make correct query with single condition', () => {
    const conds: Conditions = {
      condition: {
        attributeName: 'foo',
        attributeValue: { S: 'bar' },
        operator: '=',
      },
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' } });
    expect(query.KeyConditionExpression).toEqual('#foo = :foo');
  });

  it('should make correct query with single condition with IN operator', () => {
    const conds: Conditions = {
      condition: {
        attributeName: 'foo',
        attributeValue: { L: [{ S: 'bar' }, { S: 'baz' }] },
        operator: 'IN',
      },
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo_0': { S: 'bar' }, ':foo_1': { S: 'baz' } });
    expect(query.KeyConditionExpression).toEqual('#foo IN (:foo_0, :foo_1)');
  });

  it('should make correct query with not condition', () => {
    const conds: Conditions = {
      not: {
        condition: {
          attributeName: 'foo',
          attributeValue: { S: 'bar' },
          operator: '=',
        },
      },
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' } });
    expect(query.KeyConditionExpression).toEqual('NOT (#foo = :foo)');
  });

  it('should make correct query with and condition', () => {
    const conds: Conditions = {
      and: [
        {
          condition: {
            attributeName: 'foo',
            attributeValue: { S: 'bar' },
            operator: '=',
          },
        },
        {
          condition: {
            attributeName: 'baz',
            attributeValue: { S: 'qux' },
            operator: '<=',
          },
        },
      ],
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo', '#baz': 'baz' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' }, ':baz': { S: 'qux' } });
    expect(query.KeyConditionExpression).toEqual('(#foo = :foo) AND (#baz <= :baz)');
  });

  it('should make correct query with or condition', () => {
    const conds: Conditions = {
      or: [
        {
          condition: {
            attributeName: 'foo',
            attributeValue: { S: 'bar' },
            operator: '=',
          },
        },
        {
          condition: {
            attributeName: 'baz',
            attributeValue: { S: 'qux' },
            operator: '<>',
          },
        },
      ],
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo', '#baz': 'baz' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' }, ':baz': { S: 'qux' } });
    expect(query.KeyConditionExpression).toEqual('(#foo = :foo) OR (#baz <> :baz)');
  });

  it('should make correct query with nested conditions', () => {
    const conds: Conditions = {
      and: [
        {
          condition: {
            attributeName: 'foo',
            attributeValue: { S: 'bar' },
            operator: '=',
          },
        },
        {
          or: [
            {
              condition: {
                attributeName: 'baz',
                attributeValue: { S: 'qux' },
                operator: '<>',
              },
            },
            {
              condition: {
                attributeName: 'quux',
                attributeValue: { S: 'quuz' },
                operator: '>=',
              },
            },
          ],
        },
      ],
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo', '#baz': 'baz', '#quux': 'quux' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' }, ':baz': { S: 'qux' }, ':quux': { S: 'quuz' } });
    expect(query.KeyConditionExpression).toEqual('(#foo = :foo) AND ((#baz <> :baz) OR (#quux >= :quux))');
  });
});
