import { initApp } from '%b/plugins/init-app';
import type { TMod } from '%d/model';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

type Props = {
  currentUser: TMod.User | null;
};

export const load = async (event: ServerLoadEvent): Promise<Props> => {
  try {
    const app = await initApp();
    const currentUser = await app.GetCurrentUser({ authToken: event.cookies.get('authToken') ?? '' });

    return {
      currentUser,
    };
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(302, '/login');
  }
};
