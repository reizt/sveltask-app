import type { InferBackendIn, InferBackendOut } from '#/backend/core/types';
import type * as defs from '#/defs/core';
import { AttemptLogin } from './app/AttemptLogin';
import { CreateTask } from './app/CreateTask';
import { DeleteTask } from './app/DeleteTask';
import { GetCurrentUser } from './app/GetCurrentUser';
import { UpdateCurrentUser } from './app/UpdateCurrentUser';
import { UpdateTask } from './app/UpdateTask';
import { VerifyLogin } from './app/VerifyLogin';
import type { Context } from './context';

type OperationId = keyof typeof defs;

type InOf<O extends OperationId> = InferBackendIn<(typeof defs)[O]>;
type OutOf<O extends OperationId> = InferBackendOut<(typeof defs)[O]>;

type Before<O extends OperationId> = (input: InOf<O>, ctx: Context) => Promise<OutOf<O>>;
type After<O extends OperationId> = (input: InOf<O>) => Promise<OutOf<O>>;
const inject = <O extends OperationId>(handler: Before<O>, ctx: Context): After<O> => {
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
