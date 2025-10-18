'use client';

import ProtectedLayout from "@/components/ProtectedLayout";
import UserProfile from "@/features/auth/profile/UserProfile";

export default function Profile() {
    
    return (
        <ProtectedLayout>
            <UserProfile />
        </ProtectedLayout>
    )
}