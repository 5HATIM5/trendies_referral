import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(plain: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plain, hash);
}
