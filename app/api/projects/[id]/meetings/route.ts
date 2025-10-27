import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import {
    deleteMeetingsByProjectId,
    fetchMeetingsByProjectId,
    saveMeeting
} from '@/app/services/meetingService';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const projectId = params.id;

        const response = await fetchMeetingsByProjectId(projectId);

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
    try {
        const projectId = params.id;

        const response = await deleteMeetingsByProjectId(projectId);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}
