import { fetchMilestonesByProjectIdList } from '@/app/lib/dbService';
import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import { fetchTasksByStatusesAndUser } from '@/app/services/reportsService';

// /api/milestones?projects=xxx,yyy
export async function GET(
    request: Request,
    { params }: { params: { user: string } }
) {
    try {
        const { searchParams } = new URL(request.url);
        const programsParam = searchParams.get('programs');
        if(programsParam) { // Get tasks by programIds
            const programs = programsParam?.split(',') || [];
            const response = await fetchMilestonesByProjectIdList(programs);
            return createSuccessResponse(response); // success
        }
        return createErrorResponse({error: {message: "Invalid request parameters"}});
    } catch (error) {
        return createErrorResponse(error);
    }
}
