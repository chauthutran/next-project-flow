import { IProjectDTO } from '@/types/project';
import ProjectTableHeader from './ProjectTableHeader';
import ProjectTableRow from './ProjectTableRow';
import useConfirmDialog from '@/components/dialog/useConfirmDialog';

export default function ProjectList({
    projects,
    handleOnDeleteItem
}: {
    projects: IProjectDTO[];
    handleOnDeleteItem: (project: IProjectDTO) => void;
}) {
    return (
        <div className="overflow-hidden border border-[var(--border)] bg-[var(--card)]">
            <div className="h-[68vh] overflow-y-auto">
                <table className="min-w-full border-collapse">
                    <ProjectTableHeader />
                    <tbody className="divide-y divide-[var(--border)]">
                        {projects.map((project: IProjectDTO) => (
                            <ProjectTableRow
                                key={project._id}
                                project={project}
                                handleOnDeleteItem={handleOnDeleteItem}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
