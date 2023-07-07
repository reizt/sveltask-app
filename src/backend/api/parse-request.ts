import type { ApiRequest } from '#/defs/lib/api';
import type { Procedure } from '#/defs/lib/procedure';
import type { z } from 'zod';

export const parseRequest = (request: ApiRequest, def: Procedure): any => {
  const input: Record<string, any> = {};

  if (def.request.body?.shape != null) {
    const body: Record<string, any> = {};
    for (const key in def.request.body.shape) {
      if (request.body == null) continue;
      if (request.body[key] == null) continue;
      body[key] = request.body[key];
      input[key] = request.body[key];
    }
    def.request.body.parse(body);
  }

  if (def.request.params?.shape != null) {
    const params: Record<string, any> = {};
    for (const key in def.request.params.shape) {
      if (request.params[key] == null) continue;
      const value = request.params[key];
      const coercedValue = coerceType(value, def.request.params.shape[key]);
      params[key] = coercedValue;
      input[key] = coercedValue;
    }
    def.request.params.parse(params);
  }

  if (def.request.query?.shape != null) {
    const query: Record<string, any> = {};
    for (const key in def.request.query.shape) {
      if (request.query[key] == null) continue;
      const value = request.query[key];
      const coercedValue = coerceType(value, def.request.query.shape[key]);
      query[key] = coercedValue;
      input[key] = coercedValue;
    }
    def.request.query.parse(query);
  }

  if (def.request.cookies?.shape != null) {
    const cookies: Record<string, any> = {};
    for (const key in def.request.cookies.shape) {
      if (request.cookies[key] == null) continue;
      const value = request.cookies[key];
      const coercedValue = coerceType(value, def.request.cookies.shape[key]);
      cookies[key] = coercedValue;
      input[key] = coercedValue;
    }
    def.request.cookies.parse(cookies);
  }

  return input;
};

const coerceType = (value: any, schema: z.ZodTypeAny): any => {
  const typeName = schema._def.typeName;
  if (typeName === 'ZodString') return String(value);
  if (typeName === 'ZodNumber') return Number(value);
  if (typeName === 'ZodBoolean') return Boolean(value);
  if (typeName === 'ZodDate') return new Date(value);
  if (typeName === 'ZodArray') {
    const array = Array.isArray(value) ? value : [value];
    return array.map((item) => coerceType(item, schema._def.type));
  }
  if (typeName === 'ZodObject') {
    const object = typeof value === 'object' && value != null ? value : {};
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, coerceType(value, schema._def.type)]));
  }
  return value;
};
