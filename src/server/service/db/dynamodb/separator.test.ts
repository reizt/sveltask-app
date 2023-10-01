import { makePropName, objectRevertPropName, revertPropName } from './separator';

describe(makePropName.name, () => {
  it('should return prefixed name', () => {
    expect(makePropName('prefix', 'name')).toBe('prefix#name');
  });
});

describe(revertPropName.name, () => {
  it('should return reverted name', () => {
    expect(revertPropName('prefix', 'prefix#name')).toBe('name');
  });
});

describe(objectRevertPropName.name, () => {
  it('should return reverted object', () => {
    expect(objectRevertPropName('prefix', { 'prefix#name': 'value' })).toEqual({ name: 'value' });
  });
});
