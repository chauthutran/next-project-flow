import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import { updateTeamMember } from '@/app/services/userService';

export async function PUT(request: Request) {
    try {
        const payload = await request.json();
        
        const response = await updateTeamMember(payload);
        
        return createSuccessResponse(response); // success
    } catch (err) {
        return createErrorResponse(err);
    }
}
