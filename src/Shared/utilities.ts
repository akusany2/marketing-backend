import * as bcrypt from 'bcrypt';
import { passwordHash } from '../config';

export async function hashPassword(password): Promise<string> {
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, passwordHash.saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });

  return hashedPassword;
}

export async function comparePassword(
  password,
  hashedPassword,
): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}
