'use client';

import ProtectedLayout from "@/app/components/ProtectedLayout";
import DashboardPage from "@/app/features/dashboard/DashboardPage";

export default function Dashboard() {

    return (
        <ProtectedLayout>
            <DashboardPage />
        </ProtectedLayout>
    )
}