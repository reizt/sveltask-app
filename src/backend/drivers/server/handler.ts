import * as defs from '%d/procedures';
import type { RequestHandler } from '@sveltejs/kit';
import { initApp } from './init-app';
import { makeInput } from './make-input';
import { makeResponse } from './make-response';
import { parseEvent } from './parse-event';
import { parseOutput } from './parse-output';

export const svelteKitApiHandler: RequestHandler = async (event) => {
  const parsedEvent = await parseEvent(event, '/api');
  if (parsedEvent == null) {
    return new Response(null, { status: 404 });
  }
  const { request, procedureId } = parsedEvent;

  const app = initApp();
  const input = makeInput(request, defs[procedureId]);
  const output = await app[procedureId](input);
  const response = parseOutput(output, defs[procedureId]);
  console.log(`[SvelteKit] ${request.method} ${request.path} ${response.status}`);
  return makeResponse(response);
};
