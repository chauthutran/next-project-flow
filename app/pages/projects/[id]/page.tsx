'use client';

import ProtectedLayout from '@/components/ProtectedLayout';
import ProjectWorkspace from '@/features/project/ProjectWorkspace';
import { useParams } from 'next/navigation';

export default function ProjectEditPage() {
    const { id } = useParams();

    return (
        <ProtectedLayout>
            <ProjectWorkspace projectId={id as string} />
        </ProtectedLayout>
    );
}
