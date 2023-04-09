import { BaseException } from './BaseException';

export class ForbiddenException extends BaseException{
  constructor(options: { message: string }) {
    super(options);
  
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}
