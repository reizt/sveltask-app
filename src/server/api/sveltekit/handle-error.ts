import { ZodError } from 'zod';

export const handleError = (err: unknown): Response => {
  if (err instanceof ZodError) {
    console.error(err.issues);
    const body = { message: 'Validation Failed', errors: err.issues };
    return new Response(JSON.stringify(body), { status: 422 });
  }

  if (err instanceof Error) {
    console.error(err.message);
    return new Response(err.message, { status: 500 });
  }

  console.log(err);

  return new Response('unexpected error', { status: 500 });
};
