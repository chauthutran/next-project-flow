// /app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/User';
import { authenticateToken } from '@/app/lib/utils/authUtils';
import { createErrorResponse, createSuccessResponse } from '@/app/lib/utils/apiResponseUtil';

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
