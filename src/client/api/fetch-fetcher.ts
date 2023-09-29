import type { ApiRequest, ApiResponse } from '#/def/lib/api';
import { ApiError } from './error';
import { makeRealPath } from './make-real-path';

export const fetchFetcher = async (req: ApiRequest): Promise<ApiResponse> => {
  const path = makeRealPath(req.path, req.params);
  const url = new URL(`/api${path}`, window.location.origin);
  for (const key in req.query) {
    const value = req.query[key]!;
    if (Array.isArray(value)) {
      for (const v of value) {
        url.searchParams.append(key, v);
      }
    } else {
      url.searchParams.append(key, value);
    }
  }
  const res = await fetch(url, {
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
  if (!res.ok) {
    throw new ApiError(res.statusText, json);
  }
  return {
    status: res.status,
    body: json,
    cookies: {},
  };
};
