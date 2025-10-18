'use client';

import ProtectedLayout from "@/components/ProtectedLayout";

export default function Dashboard() {
    
    console.log("=== Dashboard - user ");
    
    return (
        <ProtectedLayout>Dashboard</ProtectedLayout>
    )
}