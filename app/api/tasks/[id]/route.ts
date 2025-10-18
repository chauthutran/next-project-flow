import {
    createErrorResponse,
    createSuccessResponse
} from '@/lib/utils/apiResponseUtil';
import { deleteTask, saveTask } from '@/services/taskService';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const payload = await request.json();
        payload._id = id;

        const response = await saveTask(payload);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        const response = await deleteTask(id);

        createSuccessResponse(response);

        return Response.json(response, { status: 200 });
    } catch (error: any) {
        createErrorResponse(error);
    }
}
