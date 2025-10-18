'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface IProps {
    children: ReactNode;
}
export default function ProtectedLayout({ children }: IProps) {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.replace('/'); // redirect to login page
        }
    }, [user, router]);

    if (!user) {
        return null; // render nothing while redirecting
    }

    return <>{children}</>;
}
