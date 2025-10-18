import {
    createErrorResponse,
    createSuccessResponse
} from '@/lib/utils/apiResponseUtil';
import { deleteMeeting, saveMeeting } from '@/services/meetingService';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const payload = await request.json();
        payload._id = id;

        const response = await saveMeeting(payload);

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
        const response = await deleteMeeting(id);

        createSuccessResponse(response);

        return Response.json(response, { status: 200 });
    } catch (error: any) {
        createErrorResponse(error);
    }
}
