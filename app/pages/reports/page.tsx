'use client';

import ProtectedLayout from '@/app/components/ProtectedLayout';
import ReportPage from '@/app/features/reports/ReportPage';

export default function Reports() {
    return (
        <ProtectedLayout>
            <ReportPage />
        </ProtectedLayout>
    );
}
