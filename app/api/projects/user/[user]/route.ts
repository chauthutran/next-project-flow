import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import { fetchProjectsByUserId } from '@/app/services/projectService';

export async function GET(
    request: Request,
    { params }: { params: { user: string } }
) {
    try {
        const userId = params.user;

        const response = await fetchProjectsByUserId(userId);

        return createSuccessResponse(response); // success
    } catch (error) {
        return createErrorResponse(error);
    }
}
