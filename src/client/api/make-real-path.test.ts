import { makeRealPath } from './make-real-path';

describe(makeRealPath.name, () => {
  it('should replace all params in the path', () => {
    const path = '/api/{id}/edit/{name}';
    const params = { id: '123', name: 'john' };
    const result = makeRealPath(path, params);
    expect(result).toEqual('/api/123/edit/john');
  });
});
