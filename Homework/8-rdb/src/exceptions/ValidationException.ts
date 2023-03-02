import { BaseException } from './BaseException';

export class ValidationException extends BaseException {
  constructor(options: { message: string }) {
    super(options);
    
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}
