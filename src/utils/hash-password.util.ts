import { randomBytes, pbkdf2Sync } from 'crypto';

const iterations = 10000;
const keylen = 64;
const digest = 'sha512';

export function hashPassword(password: string, salt?: string): { hash: string, salt: string } {
  // uniqe symbols in hash
  salt = salt || randomBytes(16).toString('hex');
  // one way algoritm
  const hash = pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
  return { hash, salt };
}

// check if passwords are equal
export function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  // get our hashed password from db
  const { hash } = hashPassword(password, salt);
  // check if new hash equal to old one
  return hash === storedHash;
}

