import * as endpints from '#/def/export-endpoints';
import type { RequestHandler } from '@sveltejs/kit';
import { app } from '../../app';
import { parseOutput } from '../lib/parse-output';
import { parseRequest } from '../lib/parse-request';
import { handleError } from './handle-error';
import { makeResponse } from './make-response';
import { parseEvent } from './parse-event';

export const svelteKitApiHandler: RequestHandler = async (event) => {
  try {
    const parsedEvent = await parseEvent(endpints, event, '/api');
    if (parsedEvent == null) {
      return new Response(null, { status: 404 });
    }
    const { request, procedureId } = parsedEvent;

    const input = parseRequest(request, endpints[procedureId]);
    const output = await app[procedureId](input);
    const response = parseOutput(output, endpints[procedureId]);
    console.log(`[SvelteKit] ${request.method} ${request.path} ${response.status}`);
    return makeResponse(response);
  } catch (err) {
    return handleError(err);
  }
};
