import { app } from '#/backend/app';
import type { TMod } from '#/defs/entity';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

type Props = {
  currentUser: TMod.User | null;
};

export const load = async (event: ServerLoadEvent): Promise<Props> => {
  try {
    const currentUser = await app.GetCurrentUser({ authToken: event.cookies.get('authToken')! });
    return {
      currentUser,
    };
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(302, '/login');
  }
};
