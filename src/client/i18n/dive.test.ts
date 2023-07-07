import { dive } from './dive';

describe(dive.name, () => {
  it('should dive into object', () => {
    const obj = {
      foo: {
        bar: 'zoo',
      },
    };
    const key = 'foo.bar';
    const expected = 'zoo';
    const actual = dive(obj, key);
    expect(actual).toBe(expected);
  });
});
