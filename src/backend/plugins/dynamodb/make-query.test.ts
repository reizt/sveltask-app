import { makeQuery, type Conditions } from './make-query';

describe(makeQuery.name, () => {
  it('should make correct query with single condition', () => {
    const conds: Conditions = {
      condition: {
        key: 'foo',
        value: { S: 'bar' },
        operator: '=',
      },
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' } });
    expect(query.KeyConditionExpression).toEqual('#foo = :foo');
  });

  it('should make correct query with not condition', () => {
    const conds: Conditions = {
      not: {
        condition: {
          key: 'foo',
          value: { S: 'bar' },
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
            key: 'foo',
            value: { S: 'bar' },
            operator: '=',
          },
        },
        {
          condition: {
            key: 'baz',
            value: { S: 'qux' },
            operator: '=',
          },
        },
      ],
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo', '#baz': 'baz' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' }, ':baz': { S: 'qux' } });
    expect(query.KeyConditionExpression).toEqual('(#foo = :foo) AND (#baz = :baz)');
  });

  it('should make correct query with or condition', () => {
    const conds: Conditions = {
      or: [
        {
          condition: {
            key: 'foo',
            value: { S: 'bar' },
            operator: '=',
          },
        },
        {
          condition: {
            key: 'baz',
            value: { S: 'qux' },
            operator: '=',
          },
        },
      ],
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo', '#baz': 'baz' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' }, ':baz': { S: 'qux' } });
    expect(query.KeyConditionExpression).toEqual('(#foo = :foo) OR (#baz = :baz)');
  });

  it('should make correct query with nested conditions', () => {
    const conds: Conditions = {
      and: [
        {
          condition: {
            key: 'foo',
            value: { S: 'bar' },
            operator: '=',
          },
        },
        {
          or: [
            {
              condition: {
                key: 'baz',
                value: { S: 'qux' },
                operator: '=',
              },
            },
            {
              condition: {
                key: 'quux',
                value: { S: 'quuz' },
                operator: '=',
              },
            },
          ],
        },
      ],
    };
    const query = makeQuery(conds);
    expect(query.ExpressionAttributeNames).toEqual({ '#foo': 'foo', '#baz': 'baz', '#quux': 'quux' });
    expect(query.ExpressionAttributeValues).toEqual({ ':foo': { S: 'bar' }, ':baz': { S: 'qux' }, ':quux': { S: 'quuz' } });
    expect(query.KeyConditionExpression).toEqual('(#foo = :foo) AND ((#baz = :baz) OR (#quux = :quux))');
  });
});
