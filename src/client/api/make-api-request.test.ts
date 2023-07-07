import type { Procedure } from '#/defs/lib/procedure';
import { z } from 'zod';
import { makeApiRequest } from './make-api-request';
import type { InferClientIn } from './types';

const procedure = {
  method: 'post',
  path: '/test/{paramsKey}',
  request: {
    params: z.object({ paramsKey: z.string() }),
    query: z.object({ queryKey: z.number() }),
    body: z.object({ bodyKey: z.string() }),
  },
  response: {
    successCode: 200,
  },
} satisfies Procedure;
const input: InferClientIn<typeof procedure> = {
  paramsKey: 'paramsKey',
  queryKey: 123,
  bodyKey: 'bodyKey',
};

describe(makeApiRequest.name, () => {
  it('works', () => {
    const request = makeApiRequest(procedure, input);
    expect(request).toEqual({
      method: 'post',
      path: '/test/paramsKey',
      body: { bodyKey: 'bodyKey' },
      query: { queryKey: '123' },
      cookies: {},
      params: { paramsKey: 'paramsKey' },
    });
  });
});
