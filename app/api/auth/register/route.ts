import {
    createErrorResponse,
    createSuccessResponse
} from '@/lib/utils/apiResponseUtil';
import { register } from '@/services/userService';

export async function POST(request: Request) {
    try {
        const payload = await request.json(); // Get request body
        
        const response = await register(payload);
        
        return createSuccessResponse(response); // success
    } catch (err) {
        return createErrorResponse(err);
    }
}
