import type { ApiRequest } from '#/defs/api/interface';
import * as defs from '#/defs/core';
import type { RequestEvent } from '@sveltejs/kit';
import { makePathRegExp } from './make-path-regexp';
import type { OperationId } from './types';

export const parseEvent = async (event: RequestEvent, prefix?: string): Promise<{ request: ApiRequest; operationId: OperationId } | null> => {
  const method = event.request.method as ApiRequest['method'];
  const cookies: Record<string, string> = {};
  for (const { name, value } of event.cookies.getAll()) {
    cookies[name] = value;
  }
  let path = event.url.pathname;
  if (prefix != null) {
    path = path.replace(new RegExp(`^${prefix}`), '');
  }
  const query = event.params as ApiRequest['query'];
  const body = await event.request.json();
  for (const operationId in defs) {
    const operation = defs[operationId as OperationId];
    if (method.toLowerCase() !== operation.method.toLowerCase()) continue;
    const regexp = makePathRegExp(operation.path);
    const match = path.match(regexp);
    if (match == null) continue;
    const params = match.groups ?? {};
    return {
      operationId: operationId as keyof typeof defs,
      request: { method, cookies, params, path, query, body },
    };
  }
  return null;
};
