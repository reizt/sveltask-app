import type { Ent } from '#/def/entity';
import { writable } from 'svelte/store';

export const currentUser = writable<Ent.User | null>(null);
