'use client';

import ProtectedLayout from '@/app/components/ProtectedLayout';
import TeamPage from '@/app/features/teams/TeamPage';

export default function Teams() {
    return (
        <ProtectedLayout>
            <TeamPage />
        </ProtectedLayout>
    );
}
