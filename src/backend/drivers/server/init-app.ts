import { createApp } from '#/backend/core/create-app';

export const initApp = () => {
  const db = null;
  return createApp({ db });
};
