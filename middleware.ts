import { NextRequest, NextResponse } from 'next/server';
import { authenticateAccount, authenticateToken } from '@/lib/utils/authUtils';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ✅ Skip authentication for login and register routes
    if (
        pathname.startsWith('/api/auth/login') ||
        pathname.startsWith('/api/auth/register')
    ) {
        return NextResponse.next();
    }

    // ✅ Try cookie token first
    const tokenIsValid = await isTokenValid(request);
    if (tokenIsValid) return NextResponse.next();

    // ✅ If no valid token, try Basic Auth
    const basicAuthIsValid = await isBasicAuthValid(request);
    if (basicAuthIsValid) return NextResponse.next();

    // ❌ If both fail → block the request
    return NextResponse.json(
        { error: { message: 'Unauthorized' } },
        { status: 401 }
    );
}

// Helper: check token validity
async function isTokenValid(request: Request) {
    try {
        await authenticateToken(request);
        return true;
    } catch {
        return false;
    }
}

// Helper: check Basic Auth validity
async function isBasicAuthValid(request: Request) {
    try {
        await authenticateAccount(request);
        return true;
    } catch {
        return false;
    }
}

/** Protect /api routes
 *      - This automatically blocks unauthorized requests to all /api/* routes.
 *  // Protect pages
 *  //     - Move to login page if user not login yet
 * */
export const config = {
    matcher: ['/api/:path*'],
    runtime: 'nodejs'
};
