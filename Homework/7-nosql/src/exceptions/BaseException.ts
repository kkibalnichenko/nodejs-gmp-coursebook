export class BaseException extends Error {
  constructor({ message }: { message: string }) {
    super(message);

    Object.setPrototypeOf(this, BaseException.prototype);
  }
}
