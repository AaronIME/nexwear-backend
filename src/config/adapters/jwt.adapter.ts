import jwt from 'jsonwebtoken';
import { envs } from './env.adapter';
import ms from 'ms';

export class JwtAdapter {
  static generateToken = (
    payload: any,
    duration: ms.StringValue = '2h'
  ): Promise<string | null> => {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration }, (error, token) => {
        if (error) {
          resolve(null);
          return;
        }

        resolve(token!);
      });
    });
  };

  static validateToken = <T>(token: string): Promise<T | null> => {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (error, decoded) => {
        if (error) {
          resolve(null);
          return;
        }

        resolve(decoded as T);
      });
    });
  };
}
