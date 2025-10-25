import { createErrorResponse, createSuccessResponse } from '@/app/lib/utils/apiResponseUtil';
import { login } from '@/app/services/userService';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json(); // Get request body
        
        const response = await login({ email, password });
        
        return createSuccessResponse(response); // success
    } catch (err) {
        return createErrorResponse(err);
    }
}
