import { BaseException } from './BaseException';

export class UnauthorizedException  extends BaseException {
  constructor(options: { message: string }) {
    super(options);
    
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
