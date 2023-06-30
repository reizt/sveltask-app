export type ApiRequest = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  body?: any;
  query: Record<string, string>;
  params: Record<string, string>;
  cookies: Record<string, string>;
};

export type ApiResponse = {
  status: number;
  body: any;
  cookies: Record<string, string>;
};
