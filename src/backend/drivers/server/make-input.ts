import type { ApiRequest } from '%d/api';
import type { Procedure } from '%d/procedure';

export const makeInput = (request: ApiRequest, def: Procedure): any => {
  const input: Record<string, any> = {};
  for (const key in def.request.body?.shape) {
    if (request.body == null) continue;
    if (request.body[key] == null) continue;
    input[key] = request.body[key];
  }
  for (const key in def.request.params?.shape) {
    if (request.params[key] == null) continue;
    input[key] = request.params[key];
  }
  for (const key in def.request.query?.shape) {
    if (request.query[key] == null) continue;
    input[key] = request.query[key];
  }
  for (const key in def.request.cookies?.shape) {
    if (request.cookies[key] == null) continue;
    input[key] = request.cookies[key];
  }
  return input;
};
