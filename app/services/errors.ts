export class AppError extends Error {
    statusCode: number;
    isOperational: boolean; // helps identify handled vs unexpected errors

    constructor(message: string, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Set the correct prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;

        Error.captureStackTrace(this);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

export class CastError extends AppError {
    constructor(message: string) {
        super(message, 400);
        this.name = 'CastError';
    }
}

export class DuplicateKeyError extends AppError {
    constructor(message: string) {
        super(message, 409);
        this.name = 'DuplicateKeyError';
    }
}

export class UnknowError extends AppError {
    constructor(message: string) {
        super(message, 500);
        this.name = 'UnknowError';
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}
