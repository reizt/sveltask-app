import type { InferBackendIn, InferBackendOut } from '%b/core/types';
import type * as defs from '%d/procedures';
import { AttemptLogin } from './app/AttemptLogin';
import { CreateTask } from './app/CreateTask';
import { DeleteTask } from './app/DeleteTask';
import { GetCurrentUser } from './app/GetCurrentUser';
import { GetTasks } from './app/GetTasks';
import { LogOut } from './app/LogOut';
import { UpdateCurrentUser } from './app/UpdateCurrentUser';
import { UpdateTask } from './app/UpdateTask';
import { VerifyLogin } from './app/VerifyLogin';
import type { Context } from './context';

type ProcedureId = keyof typeof defs;

type In<O extends ProcedureId> = InferBackendIn<(typeof defs)[O]>;
type Out<O extends ProcedureId> = InferBackendOut<(typeof defs)[O]>;

type WithContext<O extends ProcedureId> = (input: In<O>, ctx: Context) => Promise<Out<O>>;
type WithoutContext<O extends ProcedureId> = (input: In<O>) => Promise<Out<O>>;

type Inject = <O extends ProcedureId>(handler: WithContext<O>, ctx: Context) => WithoutContext<O>;
const inject: Inject = (handler, ctx) => {
  return async (input) => await handler(input, ctx);
};

type App = { [O in keyof typeof defs]: (input: In<O>) => Promise<Out<O>> };

export const createApp = (ctx: Context): App => {
  return {
    AttemptLogin: inject<'AttemptLogin'>(AttemptLogin, ctx),
    CreateTask: inject<'CreateTask'>(CreateTask, ctx),
    DeleteTask: inject<'DeleteTask'>(DeleteTask, ctx),
    GetCurrentUser: inject<'GetCurrentUser'>(GetCurrentUser, ctx),
    UpdateCurrentUser: inject<'UpdateCurrentUser'>(UpdateCurrentUser, ctx),
    UpdateTask: inject<'UpdateTask'>(UpdateTask, ctx),
    VerifyLogin: inject<'VerifyLogin'>(VerifyLogin, ctx),
    GetTasks: inject<'GetTasks'>(GetTasks, ctx),
    LogOut: inject<'LogOut'>(LogOut, ctx),
  };
};
