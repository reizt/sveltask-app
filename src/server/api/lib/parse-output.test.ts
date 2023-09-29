import type { Endpoint } from '#/def/lib/endpoint';
import { z } from 'zod';
import { parseOutput } from './parse-output';

describe(parseOutput.name, () => {
  it('should parse output', () => {
    const defDefault: Endpoint = {
      method: 'get',
      path: '/test',
      request: {},
      response: {
        successCode: 200,
        body: z.object({
          foo: z.string(),
        }),
        cookies: z.object({
          bar: z.string(),
        }),
      },
    };
    const output = {
      foo: 'foo',
      bar: 'bar',
    };
    const result = parseOutput(output, defDefault);
    expect(result).toEqual({
      body: {
        foo: 'foo',
      },
      status: 200,
      cookies: {
        bar: 'bar',
      },
    });
  });
});
