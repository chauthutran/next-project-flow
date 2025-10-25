import {
    createErrorResponse,
    createSuccessResponse
} from '@/app/lib/utils/apiResponseUtil';
import { register } from '@/app/services/userService';

export async function POST(request: Request) {
    try {
        const payload = await request.json(); // Get request body
        
        const response = await register(payload);
        
        return createSuccessResponse(response); // success
    } catch (err) {
        return createErrorResponse(err);
    }
}
