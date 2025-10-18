import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIES_TOKEN_NAME } from '@/lib/constant';

export async function POST() {
    try {
        // Delete the token cookie
        cookies().set({
            name: COOKIES_TOKEN_NAME,
            value: '',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: new Date(0) // expire immediately
        });

        return NextResponse.json(
            { status: 'success', message: 'Logged out successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { status: 'error', message: 'Failed to logout' },
            { status: 500 }
        );
    }
}
