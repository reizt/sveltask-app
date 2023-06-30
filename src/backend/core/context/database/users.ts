import type { TMod } from '%d/model';

export type _Repository = {
  findMany: (args: FindMany) => Promise<TMod.User[]>;
  findFirst: (args: FindFirst) => Promise<TMod.User | null>;
  create: (args: Create) => Promise<TMod.User>;
  update: (args: Update) => Promise<TMod.User>;
  remove: (args: Remove) => Promise<TMod.User>;
};

export type IdWhere = { id: string };
export type Where = { id?: string };

export type FindMany = { where: {} };
export type FindFirst = { where: Where };
export type Create = { data: TMod.User };
export type Update = { where: IdWhere; data: TMod.User };
export type Remove = { where: IdWhere };
