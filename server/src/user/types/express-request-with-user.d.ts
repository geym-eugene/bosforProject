import { User } from 'src/user/entity';

export declare module 'express' {
  interface Request {
    user: User;
  }
}
