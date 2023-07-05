import { dive } from './dive';
import { enTranslation } from './en.translation';
import { interop } from './interop';
import { jaTranslation } from './ja.translation';
import type { InteropValues, Lang, Translation } from './types';

type KeyPath<T> = keyof {
  [P in keyof T & string as T[P] extends string ? P : KeyPath<T[P]> extends string ? `${P}.${KeyPath<T[P]>}` : never]: T[P];
};

type Key = KeyPath<Translation>;
type Values<S extends Record<string, any>, K extends string> = K extends `${infer P}.${infer R}` ? Values<S[P], R> : InteropValues<S[K]>;

const translation = { en: enTranslation, ja: jaTranslation } satisfies Record<string, Translation>;
export const createTranslator = <L extends Lang = 'en'>(lang: L = 'en' as L) => {
  return <K extends Key>(key: K, ...args: Values<(typeof translation)[L], K> extends undefined ? [] : [Values<(typeof translation)[L], K>]) =>
    interop(dive(translation[lang], key), args[0]);
};
