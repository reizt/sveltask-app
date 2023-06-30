import type { ApiResponse } from '#/defs/api/interface';
import type { Operation } from '#/defs/core/_operation';
import type { InferClientOut } from './types';

export const decodeApiResponse = <O extends Operation>(operation: O, response: ApiResponse): InferClientOut<O> => {
  return response.body;
};
