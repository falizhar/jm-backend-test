import * as bcrypt from 'bcrypt';

/**
 * PasswordUtil
 */
export class PasswordUtil {
  hash = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  compare = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
  };
}
