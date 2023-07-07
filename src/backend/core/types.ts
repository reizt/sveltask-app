import type { Context } from '#/backend/context';
import type * as defs from '#/defs/extend/procedures';
import type { InferIn, InferOut } from './types.extend';

type ProcedureId = keyof typeof defs;
export type CoreFun<P extends ProcedureId> = (input: InferIn<(typeof defs)[P]>, ctx: Context) => Promise<InferOut<(typeof defs)[P]>>;
