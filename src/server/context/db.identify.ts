import { randomBytes } from 'node:crypto';

export const timestamp = () => Date.now();

export const generateId = () => {
  const idChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
  const len = 8;
  let buf = randomBytes(len);
  // randomBytes may return less than len buf
  while (buf.length < len) {
    buf = randomBytes(len);
  }
  const residues: number[] = [];
  for (let i = 0; i < len; i++) {
    residues.push(buf[i]! & (idChars.length - 1));
  }
  return residues.map((c) => idChars.charAt(c)).join('');
};

export const generateCode = (): string => {
  const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234567890123456789';
  const len = 6;
  let buf = randomBytes(len);
  // randomBytes may return less than len buf
  while (buf.length < len) {
    buf = randomBytes(len);
  }
  const residues: number[] = [];
  for (let i = 0; i < len; i++) {
    residues.push(buf[i]! % codeChars.length);
  }
  return residues.map((r) => codeChars.charAt(r)).join('');
};

export const generateInvitationKey = (): string => {
  const idChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
  const len = 32;
  let buf = randomBytes(len);
  // randomBytes may return less than len buf
  while (buf.length < len) {
    buf = randomBytes(len);
  }
  const residues: number[] = [];
  for (let i = 0; i < len; i++) {
    residues.push(buf[i]! & (idChars.length - 1));
  }
  return residues.map((c) => idChars.charAt(c)).join('');
};
