import type { Ent } from '#/def/entity';
import { app } from '#/server/app';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

type Props = {
  currentUser: Ent.User | null;
};

export const currentUserLoad = async (event: ServerLoadEvent): Promise<Props> => {
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
