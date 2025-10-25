import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import {
    deleteMilestonesByProjectId,
    fetchMilestonesByProjectId,
    saveMilestone
} from '@/app/services/milestoneService';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const projectId = params.id;

        const response = await fetchMilestonesByProjectId(projectId);

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

        const response = await saveMilestone(payload);

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

        const response = await deleteMilestonesByProjectId(projectId);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}
