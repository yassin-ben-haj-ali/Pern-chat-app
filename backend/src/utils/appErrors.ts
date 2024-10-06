import { StatusCodes, getReasonPhrase } from "http-status-codes";

interface IAppError {
    code: number;
    status: string;
    message: string;
    errors?: any;
}

class AppError extends Error implements IAppError {
    code: number;
    status: string;
    isOperational: boolean;
    errors?: any;

    constructor(code: number, message: string, errors?: any) {
        const status = getReasonPhrase(code);
        super(message || status);
        this.code = code;
        this.status = status;
        this.isOperational = true;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            code: this.code,
            status: this.status,
            message: this.message,
            errors: this.errors,
        };
    }
}

// Specific error classes extending AppError
export class NotFoundError extends AppError {
    constructor(message: string, errors?: any) {
        super(StatusCodes.NOT_FOUND, message, errors);
    }
}

export class InternalError extends AppError {
    constructor(message: string, errors?: any) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message, errors);
    }
}

export class AlreadyExistError extends AppError {
    constructor(message: string, errors?: any) {
        super(StatusCodes.CONFLICT, message || 'Already Exist', errors);
    }
}

export class ConflictStateError extends AppError {
    constructor(message: string, errors?: any) {
        super(
            StatusCodes.CONFLICT,
            message || 'Operation cannot be completed due to a conflict with the current state of the resource.',
            errors,
        );
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, errors?: any) {
        super(StatusCodes.BAD_REQUEST, message, errors);
    }
}

export class LimitEssay extends AppError {
    constructor(message: string, errors?: any) {
        super(StatusCodes.TOO_MANY_REQUESTS, message, errors);
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string, errors?: any) {
        super(StatusCodes.UNAUTHORIZED, message, errors);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string, errors?: any) {
        super(StatusCodes.FORBIDDEN, message, errors);
    }
}
