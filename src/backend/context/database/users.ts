import type { TMod } from '#/defs/entity';
import type { WithoutTimestamps } from './_types';

export type _Repository = {
  findById: (args: FindById) => Promise<TMod.User | null>;
  findByEmail: (args: FindByEmail) => Promise<TMod.User | null>;
  create: (args: Create) => Promise<TMod.User>;
  update: (args: Update) => Promise<TMod.User>;
  remove: (args: Remove) => Promise<TMod.User>;
};

export type IdWhere = { id: string };
export type EmailWhere = { email: string };

export type FindById = { where: IdWhere };
export type FindByEmail = { where: EmailWhere };
export type Create = { data: WithoutTimestamps<TMod.User> };
export type Update = { where: IdWhere; data: Partial<WithoutTimestamps<TMod.User>> };
export type Remove = { where: IdWhere };
