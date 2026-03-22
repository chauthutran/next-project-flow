import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { COOKIES_TOKEN_NAME } from './app/lib/constant';

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

    // ❌ If both fail → block the request
    return NextResponse.json(
        { error: { message: 'Unauthorized' } },
        { status: 401 }
    );
}

// Helper: check token validity
async function isTokenValid(request: Request) {
    try {
        // try to extract cookie named COOKIES_TOKEN_NAME
        let token: string | undefined;
        // NextRequest exposes cookies in middleware
        // @ts-ignore
        token = (request as any).cookies?.get?.(COOKIES_TOKEN_NAME)?.value;
        // fallback: parse header
        if (!token) {
            const cookieHeader = request.headers.get('cookie') || '';
            const match = cookieHeader.match(new RegExp('(?:^|; )' + COOKIES_TOKEN_NAME + '=([^;]+)'));
            token = match?.[1];
        }
        if (!token) return false;

        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

// (Basic auth removed from middleware to avoid importing DB-backed utilities.)

/** Protect /api routes
 *      - This automatically blocks unauthorized requests to all /api/* routes.
 *  // Protect pages
 *  //     - Move to login page if user not login yet
 * */
export const config = {
    matcher: ['/api/:path*'],
};

// Run middleware in Node runtime so server-only libraries (e.g. mongoose)
// can be imported here. Placing runtime at top-level is required.
export const runtime = 'nodejs';
