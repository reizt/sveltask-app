import type { z } from 'zod';
import type { Endpoint } from './endpoint';

type EndpointFun<P extends Endpoint> = (input: InferServerIn<P>) => Promise<InferServerOut<P>>;
export type ServerApp<Es extends Record<string, Endpoint>> = { [E in keyof Es]: EndpointFun<Es[E]> };

type OptionalInfer<T, F> = T extends z.ZodTypeAny ? z.infer<T> : F;
export type InferServerIn<T extends Endpoint> = OptionalInfer<T['request']['body'], {}> &
  OptionalInfer<T['request']['query'], {}> &
  OptionalInfer<T['request']['params'], {}> &
  OptionalInfer<T['request']['cookies'], {}>;

type ResponseBodyOf<T extends Endpoint> = T['response']['body'];
type ResponseCookiesOf<T extends Endpoint> = T['response']['cookies'];
export type InferServerOut<T extends Endpoint> = ResponseBodyOf<T> extends z.ZodTypeAny
  ? ResponseCookiesOf<T> extends z.ZodTypeAny
    ? z.infer<ResponseBodyOf<T>> & z.infer<ResponseCookiesOf<T>>
    : z.infer<ResponseBodyOf<T>>
  : ResponseCookiesOf<T> extends z.ZodTypeAny
  ? z.infer<ResponseCookiesOf<T>>
  : void;
