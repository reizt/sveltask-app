import type { ApiResponse } from '#/def/lib/api';
import type { Endpoint } from '#/def/lib/endpoint';

export const parseOutput = (output: any, def: Endpoint): ApiResponse => {
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
  if (JSON.stringify(output) === '{}') output = undefined;
  return { body: output, status: def.response.successCode, cookies };
};
