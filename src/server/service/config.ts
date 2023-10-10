import { env } from '$env/dynamic/private';
import type { Context } from '../context';
import { createDynmrDatabase } from './db/dynmr';
import { NodeHasher } from './hasher/node';
import { SendgridMailer } from './mailer/sendgrid';
import { JwtSigner } from './signer/jwt';

export const initContext = (): Context => {
  const db = createDynmrDatabase();
  const signer = new JwtSigner(env.JWT_PRIVATE_KEY, env.JWT_PUBLIC_KEY);
  const hasher = new NodeHasher();
  const mailer = new SendgridMailer(env.SENDGRID_API_KEY);
  return { db, signer, hasher, mailer };
};
