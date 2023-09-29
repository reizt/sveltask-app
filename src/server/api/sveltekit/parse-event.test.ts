import type { Endpoint } from '#/def/lib/endpoint';
import type { Cookies, RequestEvent } from '@sveltejs/kit';
import type { CookieParseOptions, CookieSerializeOptions } from 'cookie';
import { z } from 'zod';
import { parseEvent } from './parse-event';

class SvelteKitCookiesImpl implements Cookies {
  constructor(private readonly cookies: Record<string, string>) {}
  get(name: string, opts?: CookieParseOptions | undefined): string | undefined {
    return this.cookies[name];
  }

  getAll(opts?: CookieParseOptions | undefined): { name: string; value: string }[] {
    const list: { name: string; value: string }[] = [];
    for (const name in this.cookies) {
      list.push({ name, value: this.cookies[name]! });
    }
    return list;
  }

  set(name: string, value: string, opts?: CookieSerializeOptions | undefined): void {
    this.cookies[name] = value;
  }

  delete(name: string, opts?: CookieSerializeOptions | undefined): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.cookies[name];
  }

  sign(name: string, value: string, opts?: CookieSerializeOptions | undefined): string {
    return `${name}=${value}`;
  }

  serialize(name: string, value: string, opts?: CookieSerializeOptions | undefined): string {
    let cookie = `${name}=${value}`;
    if (opts?.expires != null) {
      cookie += `; Expires=${opts.expires.toUTCString()}`;
    }
    if (opts?.maxAge != null) {
      cookie += `; Max-Age=${opts.maxAge}`;
    }
    if (opts?.domain != null) {
      cookie += `; Domain=${opts.domain}`;
    }
    if (opts?.path != null) {
      cookie += `; Path=${opts.path}`;
    }
    if (opts?.secure != null) {
      cookie += `; Secure`;
    }
    if (opts?.httpOnly != null) {
      cookie += `; HttpOnly`;
    }
    if (opts?.sameSite != null) {
      cookie += `; SameSite=${opts.sameSite}`;
    }
    return cookie;
  }
}

const procedure: Endpoint = {
  method: 'post',
  path: '/test/{paramsKey}',
  request: {
    body: z.object({ bodyKey: z.string() }),
    query: z.object({ queryKey: z.string() }),
    params: z.object({ paramsKey: z.string() }),
    cookies: z.object({ cookiesKey: z.string() }),
  },
  response: {
    successCode: 200,
  },
};
const endpints = { TestEndpoint: procedure };

const event: RequestEvent = (() => {
  const url = new URL('http://localhost:3000/api/test/paramsKey');
  url.searchParams.set('queryKey', 'queryKey');
  return {
    url,
    request: new Request(url, {
      method: 'POST',
      body: JSON.stringify({ bodyKey: 'bodyKey' }),
    }),
    params: { queryKey: 'queryKey' },
    cookies: new SvelteKitCookiesImpl({ cookiesKey: 'cookiesKey' }),

    isDataRequest: false,
    locals: {} as any,
    platform: '' as any,
    route: {} as any,
    fetch: async () => ({}) as any,
    getClientAddress: () => '' as any,
    setHeaders: () => ({}) as any,
    isSubRequest: false,
  };
})();

describe(parseEvent.name, () => {
  const prefix = '/api';
  it('should parse event', async () => {
    const result = await parseEvent(endpints, event, prefix);
    expect(result).toEqual({
      procedureId: 'TestEndpoint',
      request: {
        method: 'POST',
        path: '/test/paramsKey',
        body: { bodyKey: 'bodyKey' },
        query: { queryKey: 'queryKey' },
        params: { paramsKey: 'paramsKey' },
        cookies: { cookiesKey: 'cookiesKey' },
      },
    });
  });
});
