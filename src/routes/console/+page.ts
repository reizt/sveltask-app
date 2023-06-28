import type { User } from '#/defs/user';
import type { PageLoad } from './$types';

type Props = {
  currentUser: User | null;
};

export const load: PageLoad = async (): Promise<Props> => {
  const currentUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'j.doe@example.com',
  };

  return {
    currentUser,
  };
};
