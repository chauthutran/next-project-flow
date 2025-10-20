import {
    createErrorResponse,
    createSuccessResponse
} from '@/lib/utils/apiResponseUtil';
import { deleteMeetingsByProjectId } from '@/services/meetingService';
import { fetchTasksByProjectId, saveTask } from '@/services/taskService';

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

        const payload = await request.json();
        payload.projectId = projectId;

        const response = await deleteMeetingsByProjectId(projectId);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}
