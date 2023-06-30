import { z } from 'zod';
import { mod_Task, mod_User, mod_Verification } from './model.schema';
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
  },
} satisfies Procedure;

export const VerifyLogin = {
  method: 'post',
  path: '/verify-login',
  request: {
    body: z.object({
      verificationId: mod_Verification.shape.id,
      token: mod_Verification.shape.token,
    }),
  },
  response: {
    successCode: 200,
    cookies: z.object({
      authToken: z.string(),
    }),
  },
} satisfies Procedure;

export const GetCurrentUser = {
  method: 'get',
  path: '/current-user',
  request: {
    cookies: z.object({
      authToken: z.string(),
    }),
  },
  response: {
    successCode: 200,
    body: mod_User,
  },
} satisfies Procedure;

export const CreateTask = {
  method: 'post',
  path: '/tasks',
  request: {
    body: z.object({
      data: z.object({
        title: mod_Task.shape.title,
        description: mod_Task.shape.description,
        status: mod_Task.shape.status,
      }),
    }),
    cookies: z.object({
      authToken: z.string(),
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
    body: z.object({}),
    cookies: z.object({
      authToken: z.string(),
    }),
  },
  response: {
    successCode: 204,
  },
} satisfies Procedure;

export const UpdateTask = {
  method: 'patch',
  path: '/tasks/{id}',
  request: {
    body: z.object({
      data: z.object({
        title: mod_Task.shape.title,
        description: mod_Task.shape.description,
        status: mod_Task.shape.status,
      }),
    }),
    cookies: z.object({
      authToken: z.string(),
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
    body: z.object({
      name: mod_User.shape.name,
    }),
  },
  response: {
    successCode: 200,
    body: mod_User,
  },
} satisfies Procedure;
