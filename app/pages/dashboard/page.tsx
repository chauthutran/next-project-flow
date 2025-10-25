'use client';

import ProtectedLayout from "@/components/ProtectedLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";

export default function Dashboard() {
    
    console.log("=== Dashboard - user ");
    
    return (
        <ProtectedLayout>
            <DashboardPage />
        </ProtectedLayout>
    )
}