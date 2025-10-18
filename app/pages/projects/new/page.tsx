'use client';

import ProtectedLayout from '@/components/ProtectedLayout';
import ProjectWorkspace from '@/features/project/ProjectWorkspace';

export default function ProjectNewForm() {
    return (
        <ProtectedLayout>
            <ProjectWorkspace />
        </ProtectedLayout>
    );
}
