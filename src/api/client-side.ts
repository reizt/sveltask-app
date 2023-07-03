import type { ApiRequest, ApiResponse } from '#/defs/lib/api';
import type { Procedure } from '#/defs/lib/procedure';
import { PUBLIC_API_ROOT } from '$env/static/public';
import { decodeApiResponse } from './shared/decode-api-response';
import { makeApiRequest } from './shared/make-api-request';
import { makeRealPath } from './shared/make-real-path';
import type { InferClientIn, InferClientOut } from './shared/types';

export const callApi = async <O extends Procedure>(procedure: O, input: InferClientIn<O>): Promise<InferClientOut<O>> => {
  const request = makeApiRequest(procedure, input);
  const response = await execApiRequest(request);
  return decodeApiResponse(procedure, response);
};

const execApiRequest = async (req: ApiRequest): Promise<ApiResponse> => {
  const path = makeRealPath(req.path, req.params);
  const res = await fetch(`${PUBLIC_API_ROOT}${path}`, {
    method: req.method.toUpperCase(),
    body: req.body != null ? JSON.stringify(req.body) : null,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
  });
  let json: any = null;
  try {
    json = await res.json();
  } catch {}

  if (res.status >= 400) {
    console.log(json);
    throw new Error(`API error: ${res.status} ${res.statusText} ${JSON.stringify(json)}`);
  }
  return {
    status: res.status,
    body: json,
    cookies: {},
  };
};