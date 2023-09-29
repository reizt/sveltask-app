import { makePathRegExp } from './make-path-regexp';

describe(makePathRegExp.name, () => {
  it('should make a regexp', () => {
    const path = '/api/v1/foo';
    const regexp = makePathRegExp(path);
    console.log(regexp);
    expect(regexp.test('/api/v1/foo')).toBe(true);
  });
  it('should capture groups', () => {
    const path = '/api/v1/users/{userId}/posts/{postId}';
    const regexp = makePathRegExp(path);
    console.log(regexp);
    expect(regexp.test('/api/v1/users/1/posts/2')).toBe(true);
    const match = '/api/v1/users/1/posts/2'.match(regexp);
    console.log(match);
    expect(match?.groups?.userId).toBe('1');
    expect(match?.groups?.postId).toBe('2');
  });
  it('even works if url contains query', () => {
    const path = '/api/v1/users/{userId}/posts/{postId}';
    const regexp = makePathRegExp(path);
    console.log(regexp);
    expect(regexp.test('/api/v1/users/1/posts/2?foo=bar')).toBe(true);
    const match = '/api/v1/users/1/posts/2?foo=bar'.match(regexp);
    console.log(match);
    expect(match?.groups?.userId).toBe('1');
    expect(match?.groups?.postId).toBe('2');
  });
  it('org slug is available', () => {
    const path = '/orgs/{slug}/available';
    const regexp = makePathRegExp(path);
    expect(regexp.test('/orgs/foo/available')).toBe(true);
    expect(regexp.test('/orgs/foo')).toBe(false);
  });
  it('update logo', () => {
    const path1 = '/orgs/{slug}/logos/{logoId}';
    const regexp1 = makePathRegExp(path1);
    expect(regexp1.test('/orgs/foo/logos/bar')).toBe(true);
    expect(regexp1.test('/orgs/foo')).toBe(false);
    const path2 = '/orgs/{slug}';
    const regexp2 = makePathRegExp(path2);
    expect(regexp2.test('/orgs/foo')).toBe(true);
    expect(regexp2.test('/orgs/foo/logos/bar')).toBe(false);
  });
});
