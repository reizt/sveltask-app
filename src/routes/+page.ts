import { redirect, type Load } from '@sveltejs/kit';

export const load: Load = async () => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw redirect(307, '/console');
};
