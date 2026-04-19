import { useProjects } from '@/app/hooks/useProjects';
import PageTitle from '@/app/components/PageTitle';
import { PiFolderLight } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import SecondButton from '@/app/components/buttons/SecondButton';
import ProjectList from './list/ProjectList';
import { deleteProject } from '@/app/redux/projects/projectThunk';
import useConfirmDialog from '@/app/components/dialog/useConfirmDialog';
import { IProjectDTO } from '@/app/types/project';
import { useEffect } from 'react';
import useNotifier from '@/app/hooks/useNotifier';
import { useAppSelector } from '@/app/redux/hook';

export default function ProjectsPage() {
    const navigate = useRouter();
    const { projects, status, selectProject } = useProjects();
    const { openDialog, ConfirmDialogComponent } = useConfirmDialog({
        title: 'Warning'
    });

    const statusUpdate = useAppSelector(
        (state) => state.projects.status.update
    );

    useEffect(() => {
        console.log('Update status changed:', statusUpdate);
    }, [statusUpdate]);

    // ===================================

    const handleOpenNewForm = () => {
        selectProject(null);
        navigate.push('/pages/projects/new');
    };

    const handleOnDeleteItem = async (project: IProjectDTO) => {
        openDialog(
            () => deleteProject(project._id!),
            `Are you sure you want to delete "${project.name}"?`
        );
    };

    // if (projects === null || loading.fetch)
    if (status.fetch.loading)
        return (
            <div className="text-center py-10 text-[var(--muted)]">
                Loading projects...
            </div>
        );

    if (status.fetch.error)
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
        <>
            {ConfirmDialogComponent}

            <div className="flex-1 overflow-y-auto bg-[var(--bg)] py-6 space-y-6">
                <PageTitle
                    title="Project Management"
                    subtitle="Track, organize, and manage your ongoing projects efficiently."
                    icon={<PiFolderLight />}
                    action={
                        <SecondButton
                            type="button"
                            title="Add"
                            onClick={handleOpenNewForm}
                        />
                    }
                />

                <ProjectList
                    projects={projects}
                    handleOnDeleteItem={handleOnDeleteItem}
                />
            </div>
        </>
    );
}
