'use client';

import ProtectedLayout from "@/app/components/ProtectedLayout";
import UserProfile from "@/app/features/auth/profile/UserProfile";

export default function Profile() {
    
    return (
        <ProtectedLayout>
            <UserProfile />
        </ProtectedLayout>
    )
}