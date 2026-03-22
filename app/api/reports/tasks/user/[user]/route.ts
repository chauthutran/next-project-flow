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
        const userId = params.user;
        // Option 1: comma-separated
        const { searchParams } = new URL(request.url);
        const statusesParam = searchParams.get('statuses');
        const statuses = statusesParam?.split(',') || [];

        const response = await fetchTasksByStatusesAndUser(userId, statuses);

        return createSuccessResponse(response); // success
    } catch (error) {
        return createErrorResponse(error);
    }
}
