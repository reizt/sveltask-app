import type { InferBackendIn, InferBackendOut } from '%b/core/types';
import type * as defs from '%d/procedures';
import { AttemptLogin } from './app/AttemptLogin';
import { CreateTask } from './app/CreateTask';
import { DeleteTask } from './app/DeleteTask';
import { GetCurrentUser } from './app/GetCurrentUser';
import { UpdateCurrentUser } from './app/UpdateCurrentUser';
import { UpdateTask } from './app/UpdateTask';
import { VerifyLogin } from './app/VerifyLogin';
import type { Context } from './context';

type ProcedureId = keyof typeof defs;

type InOf<O extends ProcedureId> = InferBackendIn<(typeof defs)[O]>;
type OutOf<O extends ProcedureId> = InferBackendOut<(typeof defs)[O]>;

type Before<O extends ProcedureId> = (input: InOf<O>, ctx: Context) => Promise<OutOf<O>>;
type After<O extends ProcedureId> = (input: InOf<O>) => Promise<OutOf<O>>;
const inject = <O extends ProcedureId>(handler: Before<O>, ctx: Context): After<O> => {
  return async (input) => await handler(input, ctx);
};

type App = { [O in keyof typeof defs]: (input: InOf<O>) => Promise<OutOf<O>> };

export const createApp = (ctx: Context): App => {
  return {
    AttemptLogin: inject<'AttemptLogin'>(AttemptLogin, ctx),
    CreateTask: inject<'CreateTask'>(CreateTask, ctx),
    DeleteTask: inject<'DeleteTask'>(DeleteTask, ctx),
    GetCurrentUser: inject<'GetCurrentUser'>(GetCurrentUser, ctx),
    UpdateCurrentUser: inject<'UpdateCurrentUser'>(UpdateCurrentUser, ctx),
    UpdateTask: inject<'UpdateTask'>(UpdateTask, ctx),
    VerifyLogin: inject<'VerifyLogin'>(VerifyLogin, ctx),
  };
};
