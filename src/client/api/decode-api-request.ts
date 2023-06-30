import type { ApiResponse } from '%d/api';
import type { Procedure } from '%d/procedure';
import type { InferClientOut } from './types';

export const decodeApiResponse = <O extends Procedure>(procedure: O, response: ApiResponse): InferClientOut<O> => {
  return response.body;
};
