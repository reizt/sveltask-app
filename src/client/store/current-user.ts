import type { TMod } from '#/def/entity';
import { writable } from 'svelte/store';

export const currentUser = writable<TMod.User | null>(null);
