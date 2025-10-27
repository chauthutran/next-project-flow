import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import { deleteTasksByProjectId, fetchTasksByProjectId, saveTask } from '@/app/services/taskService';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const projectId = params.id;

        const response = await fetchTasksByProjectId(projectId);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const projectId = params.id;

        const payload = await request.json();
        payload.projectId = projectId;

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
    try {
        const projectId = params.id;

        const response = await deleteTasksByProjectId(projectId);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}
