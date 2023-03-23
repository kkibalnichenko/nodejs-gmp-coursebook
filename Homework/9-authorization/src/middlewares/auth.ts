import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { UserEntity } from 'src/resources/user/user.entity';
import appConfig from '../../src/config/app.config';


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new ForbiddenException({ message: 'You must authorized user' }));
    return;
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    next(new ForbiddenException({ message: 'Invalid token type' }));
  }

  try {
    const user = jwt.verify(token, appConfig.tokenKey!) as UserEntity;

    req.user = user;
  } catch (err) {
    next(new UnauthorizedException({ message: 'User is not authorized' }));
  }
  return next();
}
