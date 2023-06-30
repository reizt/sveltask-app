import type { TMod } from '%d/model';
import { writable } from 'svelte/store';

export const currentUser = writable<TMod.User | null>(null);
