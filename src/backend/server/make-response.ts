import type { ApiResponse } from '%d/api';

export const makeResponse = (response: ApiResponse): Response => {
  const headers = new Headers();
  if (Object.keys(response.cookies).length > 0) {
    let setCookie = '';
    for (const key in response.cookies) {
      const value = response.cookies[key];
      setCookie += `${key}=${value ?? ''};`;
    }
    headers.append('Set-Cookie', setCookie);
  }
  return new Response(JSON.stringify(response.body), { status: response.status, headers });
};
