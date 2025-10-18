import {
    createErrorResponse,
    createSuccessResponse
} from '@/lib/utils/apiResponseUtil';
import { addProject } from '@/services/projectService';

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        const response = await addProject(payload);

        return createSuccessResponse(response);
    } catch (error) {
        return createErrorResponse(error);
    }
}
