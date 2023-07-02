import { API_ROOT } from '$env/static/private';
import type { ApiRequest, ApiResponse } from '%d/api';
import type { Procedure } from '%d/procedure';
import axios, { AxiosError } from 'axios';
import { decodeApiResponse } from './shared/decode-api-response';
import { makeApiRequest } from './shared/make-api-request';
import { makeRealPath } from './shared/make-real-path';
import type { InferClientIn, InferClientOut } from './shared/types';

export const serverSideCallApi = async <O extends Procedure>(procedure: O, input: InferClientIn<O>, cookie: string): Promise<InferClientOut<O>> => {
  const request = makeApiRequest(procedure, input);
  const response = await execApiRequest(request, cookie);
  return decodeApiResponse(procedure, response);
};

const execApiRequest = async (req: ApiRequest, cookie: string): Promise<ApiResponse> => {
  const path = makeRealPath(req.path, req.params);
  try {
    const res = await axios.request({
      method: req.method.toUpperCase(),
      baseURL: API_ROOT,
      url: path,
      data: req.body,
      params: req.query,
      headers: { 'Content-Type': 'application/json', cookie },
    });
    return {
      status: res.status,
      body: res.data,
      cookies: {},
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(JSON.stringify(err.response?.data ?? err.response ?? err.message, null, 2));
    } else {
      console.error(err);
    }
    throw err;
  }
};
