import type { TMod } from '#/defs/entity';
import { writable } from 'svelte/store';

export const currentUser = writable<TMod.User | null>(null);
