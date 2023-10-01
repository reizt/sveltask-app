import { marshallValue } from './marshall-value';

describe(marshallValue.name, () => {
  it('should marshall string', () => {
    const value = marshallValue('foo');
    expect(value).toEqual({ S: 'foo' });
  });

  it('should marshall number', () => {
    const value = marshallValue(123);
    expect(value).toEqual({ N: '123' });
  });

  it('should marshall boolean', () => {
    const value = marshallValue(true);
    expect(value).toEqual({ BOOL: true });
  });

  it('should marshall date', () => {
    const value = marshallValue(new Date('2021-01-01T00:00:00Z'));
    expect(value).toEqual({ S: '2021-01-01T00:00:00.000Z' });
  });

  it('should marshall array', () => {
    const value = marshallValue(['foo', 123, true]);
    expect(value).toEqual({ L: [{ S: 'foo' }, { N: '123' }, { BOOL: true }] });
  });

  it('should marshall object', () => {
    const value = marshallValue({ foo: 'foo', bar: 123, baz: true });
    expect(value).toEqual({ M: { foo: { S: 'foo' }, bar: { N: '123' }, baz: { BOOL: true } } });
  });

  it('should throw error if unsupported type', () => {
    expect(() => marshallValue(Symbol('foo'))).toThrowError('unsupported type: symbol');
  });
});
