import {
    createErrorResponse,
    createSuccessResponse
} from '@/lib/utils/apiResponseUtil';
import { fetchTasksByProjectId, saveTask } from '@/services/taskService';

export async function GET(
    request: Request,
    { params }: { params: { project: string } }
) {
    try {
        const projectId = params.project;

        const response = await fetchTasksByProjectId(projectId);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}

export async function POST(
    request: Request,
    { params }: { params: { project: string } }
) {
    try {
        const projectId = params.project;

        const payload = await request.json();
        payload.projectId = projectId;

        const response = await saveTask(payload);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}
