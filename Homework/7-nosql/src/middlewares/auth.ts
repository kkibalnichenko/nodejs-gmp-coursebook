import { Request, Response, NextFunction } from 'express';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import { findUserById } from '../resources/user/user.service';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

const USER_ID_HEADER = 'x-user-id';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers[USER_ID_HEADER];

  if (!userId || typeof userId !== 'string') {
    next(new ForbiddenException({ message: 'You must authorized user' }));

    return;
  }

  const user = await findUserById(userId);

  if (!user) {
    next(new UnauthorizedException({ message: 'User is not authorized' }));

    return;
  }

  req.user = user;
  next();
}
