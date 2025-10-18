import {
    createErrorResponse,
    createSuccessResponse
} from '@/lib/utils/apiResponseUtil';
import { fetchMeetingsByProjectId, saveMeeting } from '@/services/meetingService';

export async function GET(
    request: Request,
    { params }: { params: { project: string } }
) {
    try {
        const projectId = params.project;

        const response = await fetchMeetingsByProjectId(projectId);

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

        const response = await saveMeeting(payload);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}
