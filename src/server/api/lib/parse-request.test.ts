import type { ApiRequest } from '#/def/lib/api';
import type { Endpoint } from '#/def/lib/endpoint';
import { z } from 'zod';
import { parseRequest } from './parse-request';

const request: ApiRequest = {
  method: 'get',
  cookies: {
    token: 'token',
  },
  params: {
    id: 'id',
  },
  path: '/',
  query: {
    page: '1',
  },
  body: {
    title: 'title',
    description: 'description',
  },
};
const def: Endpoint = {
  method: 'get',
  path: '/',
  request: {
    body: z.object({
      title: z.string(),
      description: z.string(),
    }),
    params: z.object({
      id: z.string(),
    }),
    cookies: z.object({
      token: z.string(),
    }),
    query: z.object({
      page: z.number(),
    }),
  },
  response: {
    successCode: 200,
    body: z.object({}),
    cookies: z.object({}),
  },
};

describe(parseRequest.name, () => {
  it('works', () => {
    const input = parseRequest(request, def);
    expect(input).toEqual({
      token: 'token',
      id: 'id',
      page: 1,
      title: 'title',
      description: 'description',
    });
  });
});
