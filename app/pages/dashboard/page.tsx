'use client';

import ProtectedLayout from "@/app/components/ProtectedLayout";
import DashboardPage from "@/app/features/dashboard/DashboardPage";

export default function Dashboard() {
    
    console.log("=== Dashboard - user ");
    
    return (
        <ProtectedLayout>
            <DashboardPage />
        </ProtectedLayout>
    )
}