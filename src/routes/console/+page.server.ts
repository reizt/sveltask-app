import { serverSideCallApi } from '%c/api/server-side';
import type { TMod } from '%d/model';
import { GetCurrentUser } from '%d/procedures';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

type Props = {
  currentUser: TMod.User | null;
};

export const load = async (event: ServerLoadEvent): Promise<Props> => {
  try {
    const currentUser = await serverSideCallApi(GetCurrentUser, {}, event.request.headers.get('cookie')!);
    return {
      currentUser,
    };
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(302, '/login');
  }
};
