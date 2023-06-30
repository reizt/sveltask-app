import type { ApiRequest } from '%d/api';
import * as defs from '%d/procedures';
import type { RequestEvent } from '@sveltejs/kit';
import { makePathRegExp } from './make-path-regexp';
import type { ProcedureId } from './types';

export const parseEvent = async (event: RequestEvent, prefix?: string): Promise<{ request: ApiRequest; procedureId: ProcedureId } | null> => {
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
  for (const procedureId in defs) {
    const procedure = defs[procedureId as ProcedureId];
    if (method.toLowerCase() !== procedure.method.toLowerCase()) continue;
    const regexp = makePathRegExp(procedure.path);
    const match = path.match(regexp);
    if (match == null) continue;
    const params = match.groups ?? {};
    return {
      procedureId: procedureId as keyof typeof defs,
      request: { method, cookies, params, path, query, body },
    };
  }
  return null;
};
