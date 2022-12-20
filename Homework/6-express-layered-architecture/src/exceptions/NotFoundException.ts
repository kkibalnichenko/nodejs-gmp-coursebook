import { BaseException } from './BaseException';

export class NotFoundException  extends BaseException {
  constructor(options: { message: string }) {
    super(options);
    
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
