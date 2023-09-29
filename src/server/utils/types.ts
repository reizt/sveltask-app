export type Item<T extends readonly unknown[]> = T extends readonly (infer Item)[] ? Item : never;
