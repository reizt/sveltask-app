import type { Operation } from '#/defs/core/_operation';
import type { z } from 'zod';

type OptionalInfer<T, F> = T extends z.ZodTypeAny ? z.infer<T> : F;
export type InferClientIn<T extends Operation> = OptionalInfer<T['request']['body'], {}> &
  OptionalInfer<T['request']['query'], {}> &
  OptionalInfer<T['request']['params'], {}> &
  OptionalInfer<T['request']['cookies'], {}>;
export type InferClientOut<T extends Operation> = OptionalInfer<T['response']['body'], undefined>;
