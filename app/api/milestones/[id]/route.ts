import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import { deleteMilestone, saveMilestone } from '@/app/services/milestoneService';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const payload = await request.json();
        payload._id = id;

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
    const { id } = params;
    try {
        const response = await deleteMilestone(id);

        return createSuccessResponse(response);
    } catch (error: any) {
        createErrorResponse(error);
    }
}
