import type { ApiRequest } from '#/defs/api/interface';
import type { Operation } from '#/defs/core/_operation';
import { makeRealPath } from './make-real-path';
import type { InferClientIn } from './types';

export const makeApiRequest = <O extends Operation>(operation: O, input: InferClientIn<O>): ApiRequest => {
  const body: Record<string, any> = {};
  const params: Record<string, string> = {};
  const query: Record<string, string> = {};
  for (const key in input) {
    if (operation.request.params?.shape[key] != null) {
      const v = (input as any)[key];
      if (v !== undefined) {
        params[key] = String(v);
      }
      continue;
    }
    if (operation.request.body?.shape[key] != null) {
      const v = (input as any)[key];
      if (v !== undefined) {
        body[key] = v;
      }
      continue;
    }
    if (operation.request.query?.shape[key] != null) {
      const v = (input as any)[key];
      if (v !== undefined) {
        query[key] = String(v);
      }
      continue;
    }
  }
  return {
    method: operation.method,
    path: makeRealPath(operation.path, params),
    body,
    query,
    cookies: {},
    params,
  };
};
