'use client';

import ProtectedLayout from '@/components/ProtectedLayout';
import ProjectsPage from '@/features/project/ProjectPage';

export default function Projects() {
    return (
        <ProtectedLayout>
            <ProjectsPage />
        </ProtectedLayout>
    );
}
