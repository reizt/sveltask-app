import type * as endpints from '#/def/export-endpoints';
import type { InferServerIn, InferServerOut, ServerApp } from '#/def/lib/server.types';
import type { Context } from '#/server/context';
import { CreateTask } from './app/CreateTask.fun';
import { DeleteTask } from './app/DeleteTask.fun';
import { GetCurrentUser } from './app/GetCurrentUser.fun';
import { GetTasks } from './app/GetTasks.fun';
import { IssueCode } from './app/IssueCode.fun';
import { LogIn } from './app/LogIn.fun';
import { LogOut } from './app/LogOut.fun';
import { UpdateCurrentUser } from './app/UpdateCurrentUser.fun';
import { UpdatePassword } from './app/UpdatePassword.fun';
import { UpdateTask } from './app/UpdateTask.fun';
import { VerifyCode } from './app/VerifyCode.fun';

type EndpointId = keyof typeof endpints;

type WithContext<O extends EndpointId> = (input: InferServerIn<(typeof endpints)[O]>, ctx: Context) => Promise<InferServerOut<(typeof endpints)[O]>>;
type WithoutContext<O extends EndpointId> = (input: InferServerIn<(typeof endpints)[O]>) => Promise<InferServerOut<(typeof endpints)[O]>>;

type Inject = <O extends EndpointId>(handler: WithContext<O>, ctx: Context) => WithoutContext<O>;
const inject: Inject = (handler, ctx) => {
  return async (input) => await handler(input, ctx);
};

export const createApp = (ctx: Context): ServerApp<typeof endpints> => {
  return {
    IssueCode: inject<'IssueCode'>(IssueCode, ctx),
    CreateTask: inject<'CreateTask'>(CreateTask, ctx),
    DeleteTask: inject<'DeleteTask'>(DeleteTask, ctx),
    GetCurrentUser: inject<'GetCurrentUser'>(GetCurrentUser, ctx),
    UpdateCurrentUser: inject<'UpdateCurrentUser'>(UpdateCurrentUser, ctx),
    UpdateTask: inject<'UpdateTask'>(UpdateTask, ctx),
    VerifyCode: inject<'VerifyCode'>(VerifyCode, ctx),
    GetTasks: inject<'GetTasks'>(GetTasks, ctx),
    LogOut: inject<'LogOut'>(LogOut, ctx),
    LogIn: inject<'LogIn'>(LogIn, ctx),
    UpdatePassword: inject<'UpdatePassword'>(UpdatePassword, ctx),
  };
};
