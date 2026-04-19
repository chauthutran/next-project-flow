"use client";

import ProtectedLayout from "@/app/components/ProtectedLayout";
import ChangePasswordPageComponent from "@/app/features/auth/changePassword/ChangePasswordPage";

export default function ChangePasswordPage() {
    return (
        <ProtectedLayout>
            <ChangePasswordPageComponent />
        </ProtectedLayout>
    )
}