import { makeResponse } from './make-response';

describe(makeResponse.name, () => {
  it('should make response', async () => {
    const response = {
      body: {
        foo: 'foo',
      },
      status: 200,
      cookies: {
        bar: 'bar',
      },
    };
    const result = makeResponse(response);
    const body = await result.json();
    expect(body).toEqual(response.body);
    expect(result.status).toEqual(response.status);
    expect(result.headers.get('Set-Cookie')?.startsWith('bar=bar;')).toBeTruthy();
  });
});
