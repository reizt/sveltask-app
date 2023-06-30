import type { ApiResponse } from '#/defs/api/interface';
import type { Operation } from '#/defs/core/_operation';

export const parseOutput = (output: any, def: Operation): ApiResponse => {
  const cookies: Record<string, any> = {};
  const omitKeys: string[] = [];
  if (def.response.cookies != null) {
    for (const key in def.response.cookies.shape) {
      cookies[key] = output[key];
      omitKeys.push(key);
    }
  }
  for (const key of omitKeys) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete output[key];
  }
  return { body: output, status: def.response.successCode, cookies };
};
