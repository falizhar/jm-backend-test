import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export class TokenUtil {
  generate = (id: number): string => {
    return jwt.sign({ id }, JWT_SECRET_KEY as string, { expiresIn: '1d' });
  };

  decode = (token: string): any => {
    try {
      return jwt.verify(token, `${JWT_SECRET_KEY}`);
    } catch (error) {
      return error;
    }
  };

  private ran = (min: number, max: number): number => {
    const random: number = Math.random();
    return Math.floor(random * (max - min) + min);
  };

  slugGenerator = (length: number): string => {
    length = length || 10;

    const allowsChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    while (code.length < length) {
      const charIndex: number = this.ran(0, allowsChars.length - 1);
      code += allowsChars[charIndex];
    }
    return code;
  };
}
