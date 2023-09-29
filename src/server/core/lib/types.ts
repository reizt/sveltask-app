import type * as endpoints from '#/def/export-endpoints';
import type { InferServerIn, InferServerOut } from '#/def/lib/server.types';
import type { Context } from '#/server/context';

export type EndpointId = keyof typeof endpoints;
export type ServerFun<P extends EndpointId> = (input: InferServerIn<(typeof endpoints)[P]>, ctx: Context) => Promise<InferServerOut<(typeof endpoints)[P]>>;
