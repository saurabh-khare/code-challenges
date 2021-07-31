import { CustomError } from './CustomError';

export class ApplicationError extends CustomError {
    statusCode = 500;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, ApplicationError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
    serialize(): { message: string }[] {
        return [{ message: this.message }];
    }
}
