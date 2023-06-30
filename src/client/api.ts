import type { Operation } from '#/defs/core/_operation';
import { decodeApiResponse } from './decode-api-request';
import { execApiRequest } from './exec-api-request';
import { makeApiRequest } from './make-api-request';
import type { InferClientIn, InferClientOut } from './types';

export const callApi = async <O extends Operation>(operation: O, input: InferClientIn<O>): Promise<InferClientOut<O>> => {
  const request = makeApiRequest(operation, input);
  const response = await execApiRequest(request);
  return decodeApiResponse(operation, response);
};
