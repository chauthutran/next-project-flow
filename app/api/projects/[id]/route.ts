import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import {
    deleteProject,
    fetchProjectById,
    updateProject
} from '@/app/services/projectService';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const projectId = params.id;

    try {
        const response = await fetchProjectById(projectId);
        return createSuccessResponse(response);
    } catch (error: any) {
        return createErrorResponse(error);
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const projectId = params.id;
    try {
        const payload = await request.json();

        const response = await updateProject(projectId, payload);

        return createSuccessResponse(response);
    } catch (error: any) {
        return createErrorResponse(error);
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const projectId = params.id;
    try {
        const response = await deleteProject(projectId);

        return createSuccessResponse(response);
    } catch (error: any) {
        return createErrorResponse(error);
    }
}
