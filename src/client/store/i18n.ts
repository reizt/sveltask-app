import type { Lang } from '#/client/i18n/types';
import { writable } from 'svelte/store';

type Store = {
  lang: Lang;
};
export const i18n = writable<Store>({
  lang: 'en',
});
