import type { ApiResponse } from '#/def/lib/api';
import type { Endpoint } from '#/def/lib/endpoint';
import type { z } from 'zod';
import type { InferClientOut } from './types';

export const decodeApiResponse = <O extends Endpoint>(procedure: O, response: ApiResponse): InferClientOut<O> => {
  if (procedure.response.body === undefined) {
    return undefined as unknown as InferClientOut<O>;
  }
  return coerce(response.body, procedure.response.body);
};

const coerce = <T>(value: unknown, type: z.ZodType<T>): T => {
  const result = type.safeParse(value);
  if (!result.success) {
    throw new Error(`Failed to coerce value: ${result.error.message}`);
  }
  return result.data;
};
