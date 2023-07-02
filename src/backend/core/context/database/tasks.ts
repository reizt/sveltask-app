import type { TMod } from '%d/model';

export type _Repository = {
  findMany: (args: FindMany) => Promise<TMod.Task[]>;
  findFirst: (args: FindFirst) => Promise<TMod.Task | null>;
  create: (args: Create) => Promise<TMod.Task>;
  update: (args: Update) => Promise<TMod.Task>;
  remove: (args: Remove) => Promise<TMod.Task>;
};

export type IdWhere = { id: string };
export type Where = { id?: string; userId?: string };

export type FindMany = { where: { userId: string } };
export type FindFirst = { where: Where };
export type Create = { data: TMod.Task };
export type Update = { where: IdWhere; data: Partial<TMod.Task> };
export type Remove = { where: IdWhere };
