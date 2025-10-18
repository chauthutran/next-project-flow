import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { parse } from 'cookie';
import * as UserService from '@/services/userService';
import connectToDatabase from '../dbService/db';
import { cookies } from 'next/headers';
import { COOKIES_TOKEN_NAME } from '../constant';

interface IAuthPayload extends JWTPayload {
    id: string;
    email: string;
    role: string;
}

// When authenticate() fails, the middleware catches it and returns 401 — blocking the request.
export async function authenticateToken(request: Request) {
    // const cookies = request.headers.get('cookie') || '';
    // const { token } = parse(cookies);
    const token = cookies().get(COOKIES_TOKEN_NAME)?.value;
    
    if (!token) {
        throw new Error('Unauthorized');
    }

    try {
        const payload = await verifyToken(token);
        return payload; // contains your user data (id, email, role, etc.)
    } catch (err) {
        throw new Error('Invalid token');
    }
}

export async function authenticateAccount(request: Request) {
    await connectToDatabase(); // ✅ ensure connection

    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        throw new Error('Unauthorized');
    }

    // Decode username and password
    const base64Credentials = authHeader.split(' ')[1];
    const decoded = atob(base64Credentials);
    if (!decoded.includes(':')) throw new Error('Invalid auth format');

    const [username, password] = decoded.split(':');

    // Validate user
    const user = await UserService.login({ email: username, password });
    if (user) {
        throw new Error('Unauthorized');
    }

    return user;
}

// ==========================================================================
// === For token

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_EXPIRES_IN = Number.parseInt(process.env.JWT_EXPIRES_IN!); // 3600 = '1h', '7d', '30m', etc. => token expiration

export async function verifyToken(token: string): Promise<IAuthPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        //  payload contains { id, email, role, iat, exp }
        return payload as IAuthPayload;
    } catch (err) {
        return null;
    }
}

export async function setAuthCookie(user: IAuthPayload) {
    const token = await new SignJWT(user) // user payload
        .setProtectedHeader({ alg: 'HS256' }) // algorithm
        .setIssuedAt()
        .setExpirationTime(Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN) // '1h' expires in 1 hour
        .sign(JWT_SECRET);

    cookies().set({
        name: COOKIES_TOKEN_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Avoid Browsers ignore cookies without secure if you’re using HTTPS.
        sameSite: 'lax', // ✅ not 'strict'
        path: '/', // must be '/'
        maxAge: JWT_EXPIRES_IN // 1 hour
    });
}
