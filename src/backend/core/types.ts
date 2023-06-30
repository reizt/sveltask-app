import type { Procedure } from '%d/procedure';
import type * as defs from '%d/procedures';
import type { z } from 'zod';
import type { Context } from './context';

type OptionalInfer<T, F> = T extends z.ZodTypeAny ? z.infer<T> : F;
export type InferBackendIn<T extends Procedure> = OptionalInfer<T['request']['body'], {}> &
  OptionalInfer<T['request']['query'], {}> &
  OptionalInfer<T['request']['params'], {}> &
  OptionalInfer<T['request']['cookies'], {}>;

type ResponseBodyOf<T extends Procedure> = T['response']['body'];
type ResponseCookiesOf<T extends Procedure> = T['response']['cookies'];
export type InferBackendOut<T extends Procedure> = ResponseBodyOf<T> extends z.ZodTypeAny
  ? ResponseCookiesOf<T> extends z.ZodTypeAny
    ? z.infer<ResponseBodyOf<T>> & z.infer<ResponseCookiesOf<T>>
    : z.infer<ResponseBodyOf<T>>
  : ResponseCookiesOf<T> extends z.ZodTypeAny
  ? z.infer<ResponseCookiesOf<T>>
  : void;

type ProcedureId = keyof typeof defs;
export type Fun<P extends ProcedureId> = (input: InferBackendIn<(typeof defs)[P]>, ctx: Context) => Promise<InferBackendOut<(typeof defs)[P]>>;
