import type { User } from '#/defs/user';
import { writable } from 'svelte/store';

export const currentUserWT = writable<User | null>(null);
