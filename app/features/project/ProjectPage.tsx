import { useProjects } from '@/hooks/useProjects';
import ProjectList from './ProjectList';
import useAuth from '@/hooks/useAuth';
import PageTitle from '@/components/PageTitle';
import { PiFolderLight } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import SecondButton from '@/components/buttons/SecondButton';

export default function ProjectsPage() {
    const navigate = useRouter();
    const { projects, loading, error } = useProjects();

    if (projects === null || loading)
        return (
            <div className="text-center py-10 text-[var(--muted)]">
                Loading projects...
            </div>
        );

    if (error)
        return (
            <div className="text-center py-10 text-[var(--error)]">
                Failed to load projects.
            </div>
        );

    if (!projects || projects.length === 0)
        return (
            <div className="text-center py-10 text-[var(--muted)]">
                No projects found.{' '}
                <button
                    onClick={() => navigate.push('/pages/projects/new')}
                    className="text-[var(--primary)] font-semibold hover:underline"
                >
                    Create one now
                </button>
            </div>
        );

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--bg)]">
            <PageTitle
                title="Project Management"
                subtitle="Track, organize, and manage your ongoing projects efficiently."
                icon={<PiFolderLight />}
                action={
                    <SecondButton
                        type="button"
                        title="+ New Project"
                        onClick={() => navigate.push('/pages/projects/new')}
                    />
                }
            />

            <ProjectList projects={projects} />
        </div>
    );
}
