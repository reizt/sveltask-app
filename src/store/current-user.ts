import type { User } from '#/defs/model/model.type';
import { writable } from 'svelte/store';

export const currentUser = writable<User | null>(null);
