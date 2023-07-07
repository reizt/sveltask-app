import type { Context } from '#/backend/context';
import type * as defs from '#/defs/extend/procedures';
import { AttemptLogin } from './funcs/AttemptLogin.fun';
import { CreateTask } from './funcs/CreateTask.fun';
import { DeleteTask } from './funcs/DeleteTask.fun';
import { GetCurrentUser } from './funcs/GetCurrentUser.fun';
import { GetTasks } from './funcs/GetTasks.fun';
import { LogOut } from './funcs/LogOut.fun';
import { UpdateCurrentUser } from './funcs/UpdateCurrentUser.fun';
import { UpdateTask } from './funcs/UpdateTask.fun';
import { VerifyLogin } from './funcs/VerifyLogin.fun';
import type { App, InferIn, InferOut } from './types.extend';

type ProcedureId = keyof typeof defs;

type WithContext<O extends ProcedureId> = (input: InferIn<(typeof defs)[O]>, ctx: Context) => Promise<InferOut<(typeof defs)[O]>>;
type WithoutContext<O extends ProcedureId> = (input: InferIn<(typeof defs)[O]>) => Promise<InferOut<(typeof defs)[O]>>;

type Inject = <O extends ProcedureId>(handler: WithContext<O>, ctx: Context) => WithoutContext<O>;
const inject: Inject = (handler, ctx) => {
  return async (input) => await handler(input, ctx);
};

export const createApp = (ctx: Context): App<typeof defs> => {
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
