'use client';

import ProjectCalendar from "@/app/features/calendar/ProjectCalendar";
import ProtectedLayout from "@/app/components/ProtectedLayout";

export default function CalendarPage() {
    return (
        <ProtectedLayout>
            <ProjectCalendar />
        </ProtectedLayout>
    );
}