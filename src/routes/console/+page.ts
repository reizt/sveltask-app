import type { TMod } from '%d/model';
import type { PageLoad } from './$types';

type Props = {
  currentUser: TMod.User | null;
};

export const load: PageLoad = async (): Promise<Props> => {
  const currentUser: TMod.User = {
    id: '1',
    name: 'John Doe',
    email: 'j.doe@example.com',
  };

  return {
    currentUser,
  };
};
