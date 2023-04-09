import { UserEntity } from '../../src/resources/user/user.entity';

export {}

declare global {
  namespace Express {
    export interface Request {
      user: UserEntity;
    }
  }
}
