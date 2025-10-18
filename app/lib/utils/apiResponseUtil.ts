import { AppError } from "@/services/errors";

export function createSuccessResponse(data: any, statusCode = 200): Response {
    return Response.json({ status: 'success', data }, { status: statusCode });
}

export function createErrorResponse(err: unknown): Response {
    const error =
        err instanceof AppError
            ? err
            : new AppError('Unexpected server error', 500);

    return Response.json(
        {
            status: 'error',
            message: error.message,
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
            }),
        },
        { status: error.statusCode }
    );
}
