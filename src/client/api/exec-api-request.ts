import type { ApiRequest, ApiResponse } from '%d/api';
import { makeRealPath } from './make-real-path';

export const execApiRequest = async (req: ApiRequest): Promise<ApiResponse> => {
  const path = makeRealPath(req.path, req.params);
  const res = await fetch(`/api${path}`, {
    method: req.method.toUpperCase(),
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
  });
  const json = await res.json();
  return {
    status: res.status,
    body: json,
    cookies: {},
  };
};
