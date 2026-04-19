import { createErrorResponse, createSuccessResponse } from '@/app/lib/utils/apiResponseUtil';
import { changePassword } from '@/app/services/userService';

export async function POST(request: Request) {
    try {
        const { email, oldPassword, newPassword } = await request.json(); // Get request body
        
        const response = await changePassword({ email, oldPassword, newPassword });
        
        return createSuccessResponse(response); // success
    } catch (err) {
        return createErrorResponse(err);
    }
}
