import type { z } from 'zod';

export type Operation = {
  id: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  request: {
    body?: z.ZodObject<any, any>;
    query?: z.ZodObject<any, any>;
    params?: z.ZodObject<any, any>;
    cookies?: z.ZodObject<any, any>;
  };
  response: {
    successCode: number;
    body?: z.ZodType<any, any, any>;
    cookies?: z.ZodObject<any, any>;
  };
};

type OptionalInfer<T, F> = T extends z.ZodTypeAny ? z.infer<T> : F;

export type InferBody<T extends Operation> = OptionalInfer<T['request']['body'], undefined>;
