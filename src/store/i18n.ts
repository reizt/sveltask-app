import type { Lang } from '#/i18n/types';
import { writable } from 'svelte/store';

type Store = {
  lang: Lang;
};
export const i18n = writable<Store>({
  lang: 'en',
});
