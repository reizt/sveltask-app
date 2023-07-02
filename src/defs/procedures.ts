import { z } from 'zod';
import { mod_Task, mod_User } from './model.schema';
import type { Procedure } from './procedure';

export const AttemptLogin = {
  method: 'post',
  path: '/attempt-login',
  request: {
    body: z.object({
      email: mod_User.shape.email,
    }),
  },
  response: {
    successCode: 204,
    cookies: z.object({ authToken: z.string() }),
  },
} satisfies Procedure;

export const VerifyLogin = {
  method: 'post',
  path: '/verify-login',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z.object({
      code: z.string(),
    }),
  },
  response: {
    successCode: 200,
    cookies: z.object({ authToken: z.string() }),
  },
} satisfies Procedure;

export const LogOut = {
  method: 'delete',
  path: '/logout',
  request: {
    cookies: z.object({ authToken: z.string() }),
  },
  response: {
    successCode: 204,
    cookies: z.object({ authToken: z.string() }),
  },
} satisfies Procedure;

export const GetCurrentUser = {
  method: 'get',
  path: '/current-user',
  request: {
    cookies: z.object({ authToken: z.string() }),
  },
  response: {
    successCode: 200,
    body: mod_User,
  },
} satisfies Procedure;

export const GetTasks = {
  method: 'get',
  path: '/tasks',
  request: {
    cookies: z.object({ authToken: z.string() }),
  },
  response: {
    successCode: 200,
    body: z.array(mod_Task),
  },
} satisfies Procedure;

export const CreateTask = {
  method: 'post',
  path: '/tasks',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z.object({
      title: mod_Task.shape.title,
      description: mod_Task.shape.description,
      status: mod_Task.shape.status,
    }),
  },
  response: {
    successCode: 201,
    body: mod_Task,
  },
} satisfies Procedure;

export const DeleteTask = {
  method: 'delete',
  path: '/tasks/{id}',
  request: {
    cookies: z.object({ authToken: z.string() }),
    params: z.object({ id: z.string() }),
  },
  response: {
    successCode: 204,
  },
} satisfies Procedure;

export const UpdateTask = {
  method: 'patch',
  path: '/tasks/{id}',
  request: {
    cookies: z.object({ authToken: z.string() }),
    params: z.object({ id: z.string() }),
    body: z.object({
      title: mod_Task.shape.title,
      description: mod_Task.shape.description,
      status: mod_Task.shape.status,
    }),
  },
  response: {
    successCode: 200,
    body: mod_Task,
  },
} satisfies Procedure;

export const UpdateCurrentUser = {
  method: 'patch',
  path: '/current-user',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z.object({
      name: mod_User.shape.name,
    }),
  },
  response: {
    successCode: 200,
    body: mod_User,
  },
} satisfies Procedure;
