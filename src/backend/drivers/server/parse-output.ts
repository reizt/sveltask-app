import type { ApiResponse } from '%d/api';
import type { Procedure } from '%d/procedure';

export const parseOutput = (output: any, def: Procedure): ApiResponse => {
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
