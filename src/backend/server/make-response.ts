import type { ApiResponse } from '%d/api';

export const makeResponse = (response: ApiResponse): Response => {
  const headers = new Headers();
  if (Object.keys(response.cookies).length > 0) {
    let setCookie = '';
    for (const key in response.cookies) {
      const value = response.cookies[key];
      setCookie += `${key}=${value ?? ''}; Path=/; HttpOnly; SameSite=Lax;`;
    }
    headers.append('Set-Cookie', setCookie);
  }
  const body = response.body != null ? JSON.stringify(response.body) : null;
  return new Response(body, { status: response.status, headers });
};
