'use client';

import ProtectedLayout from '@/app/components/ProtectedLayout';
import ProjectsPage from '@/app/features/project/ProjectPage';

export default function Projects() {
    return (
        <ProtectedLayout>
            <ProjectsPage />
        </ProtectedLayout>
    );
}
