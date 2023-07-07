import type { TMod } from '#/defs/entity';
import type { WithoutTimestamps } from './_types';

export type _Repository = {
  findMany: (args: FindMany) => Promise<TMod.Task[]>;
  findById: (args: FindById) => Promise<TMod.Task | null>;
  create: (args: Create) => Promise<TMod.Task>;
  update: (args: Update) => Promise<TMod.Task>;
  remove: (args: Remove) => Promise<TMod.Task>;
};

export type IdWhere = { id: string };

export type FindMany = { where: { userId: string } };
export type FindById = { where: IdWhere };
export type Create = { data: WithoutTimestamps<TMod.Task> };
export type Update = { where: IdWhere; data: Partial<WithoutTimestamps<TMod.Task>> };
export type Remove = { where: IdWhere };
