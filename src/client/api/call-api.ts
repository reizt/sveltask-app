import type { Procedure } from '#/defs/lib/procedure';
import { decodeApiResponse } from './decode-api-response';
import { fetchFetcher } from './fetch-fetcher';
import { makeApiRequest } from './make-api-request';
import type { InferClientIn, InferClientOut } from './types';

export const callApi = async <O extends Procedure>(procedure: O, input: InferClientIn<O>): Promise<InferClientOut<O>> => {
  const request = makeApiRequest(procedure, input);
  const response = await fetchFetcher(request);
  return decodeApiResponse(procedure, response);
};
