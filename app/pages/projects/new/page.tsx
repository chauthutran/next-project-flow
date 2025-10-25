'use client';

import ProtectedLayout from '@/app/components/ProtectedLayout';
import ProjectWorkspace from '@/app/features/project/ProjectWorkspace';

export default function ProjectNewForm() {
    return (
        <ProtectedLayout>
            <ProjectWorkspace />
        </ProtectedLayout>
    );
}
