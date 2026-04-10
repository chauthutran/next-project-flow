import { fetchMeetingsByProjectIdList, fetchTasksByProjectIdList } from '@/app/lib/dbService';
import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import { fetchTasksByStatusesAndUser } from '@/app/services/reportsService';

// /api/tasks?user=64f72cb7f1c1b47650cbe8a5&statuses=not_started,in_progress
export async function GET(
    request: Request,
    { params }: { params: { user: string } }
) {
    try {
        const { searchParams } = new URL(request.url);
        const programsParam = searchParams.get('programs');
        if(programsParam) { // Get tasks by programIds
            const programs = programsParam?.split(',') || [];
            const response = await fetchMeetingsByProjectIdList(programs);
            return createSuccessResponse(response); // success
        }
        return createErrorResponse({error: {message: "Invalid request parameters"}});
    } catch (error) {
        return createErrorResponse(error);
    }
}
