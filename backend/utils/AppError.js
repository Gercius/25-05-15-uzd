export class AppError extends Error {
    status;
    isOperational;

    constructor(message, status = 500, isOperational = true) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}
