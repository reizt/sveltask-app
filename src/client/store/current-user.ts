import type { TMod } from '%d/entity';
import { writable } from 'svelte/store';

export const currentUser = writable<TMod.User | null>(null);
