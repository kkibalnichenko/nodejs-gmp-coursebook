import { Request, Response, NextFunction } from 'express';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { BaseException } from '../exceptions/BaseException';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ValidationException } from '../exceptions/ValidationException';
import { responseWrapper } from '../utils/responseWrapper';

function getStatusByException(err: BaseException) {
  if (err instanceof NotFoundException) {
    return 404;
  }
  if (err instanceof ForbiddenException) {
    return 403;
  }
  if (err instanceof UnauthorizedException) {
    return 401;
  }
  if (err instanceof ValidationException) {
    return 400;
  }
}

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.log('Error received:', err);
  if (err instanceof BaseException) {
    res.send(responseWrapper(null, getStatusByException(err), err.message));
    return;
  }
  
  res.send({
    statusCode: 500,
    message: 'Internal Server error',
    data: null
  });
}
