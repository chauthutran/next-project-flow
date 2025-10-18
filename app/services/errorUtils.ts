import mongoose from 'mongoose';
import {
    CastError,
    DuplicateKeyError,
    UnknowError,
    ValidationError
} from './errors';

/** returns "never" means :
 *      This function will never successfully return a value
 *      — it will either throw an error or never finish executing.”
 * */
export const handleError = (error: any): never => {
    // Handle known Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(error.errors)
            .map((err) => err.message)
            .join(', ');
        throw new ValidationError(`Validation failed: ${messages}`);
    }

    // Handle invalid ObjectId or cast errors
    if (error instanceof mongoose.Error.CastError) {
        throw new CastError(
            `Invalid value for field "${error.path}": ${error.value}`
        );
    }

    // Handle duplicate key errors (MongoDB error code 11000)
    if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as any).code === 11000
    ) {
        const keyValue = (error as any).keyValue || {};
        const fields = Object.keys(keyValue).join(', ');
        throw new DuplicateKeyError(
            `Duplicate key error on field(s): ${fields}`
        );
    }

    // Fallback for non-Error types
    throw new UnknowError(`${error?.message}`);
};
