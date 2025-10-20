// /app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { authenticateToken } from '@/lib/utils/authUtils';
import { createErrorResponse, createSuccessResponse } from '@/lib/utils/apiResponseUtil';

export async function GET(request: NextRequest) {
    try {
        // userInToken contains { id, email, role }
        const userInToken = await authenticateToken(request);
        if(userInToken)
        {
            const user = await User.findById(userInToken.id).lean();
            return createSuccessResponse(user); // success
        }
        // Token is not existed or expired
        return NextResponse.json({ status: 'error', message: "Unauthorized"}, {status: 401});
    } catch (error) {
        return createErrorResponse(error);
    }
}
