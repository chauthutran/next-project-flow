import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import { fetchTasksByStatusesAndUser, fetchWeeklyTasks } from '@/app/services/reportsService';

// /api/reports/tasks/user/{userId}/weekly?startDate=2026-03-01
export async function GET(
    request: Request,
    { params }: { params: { user: string } }
) {
    try {
        const userId = params.user;
        // Option 1: comma-separated
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');

        const response = await fetchWeeklyTasks(userId, startDate);

        return createSuccessResponse(response); // success
    } catch (error) {
        return createErrorResponse(error);
    }
}
