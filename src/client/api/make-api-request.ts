import type { ApiRequest } from '#/def/lib/api';
import type { Endpoint } from '#/def/lib/endpoint';
import { makeRealPath } from './make-real-path';
import type { InferClientIn } from './types';

export const makeApiRequest = <O extends Endpoint>(procedure: O, input: InferClientIn<O>): ApiRequest => {
  const body: Record<string, any> = {};
  const params: Record<string, string> = {};
  const query: Record<string, string> = {};
  for (const key in input) {
    if (procedure.request.params?.shape[key] != null) {
      const v = (input as any)[key];
      if (v !== undefined) {
        params[key] = String(v);
      }
      continue;
    }
    if (procedure.request.body?.shape[key] != null) {
      const v = (input as any)[key];
      if (v !== undefined) {
        body[key] = v;
      }
      continue;
    }
    if (procedure.request.query?.shape[key] != null) {
      const v = (input as any)[key];
      if (v !== undefined) {
        query[key] = String(v);
      }
      continue;
    }
  }
  return {
    method: procedure.method,
    path: makeRealPath(procedure.path, params),
    body: JSON.stringify(body) === '{}' ? null : body,
    query,
    cookies: {},
    params,
  };
};
