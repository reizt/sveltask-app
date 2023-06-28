import type { User } from '#/defs/user';
import { writable } from 'svelte/store';

export const currentUser = writable<User | null>(null);
