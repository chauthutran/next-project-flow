import { IProjectDTO } from '@/app/types/project';
import ProjectTableHeader from './ProjectTableHeader';
import ProjectTableRow from './ProjectTableRow';

export default function ProjectList({
    projects,
    handleOnDeleteItem
}: {
    projects: IProjectDTO[];
    handleOnDeleteItem: (project: IProjectDTO) => void;
}) {
    return (
        <div className="overflow-hidden bg-[var(--card)]">
            <div className="h-[65vh] w-[calc(100vw-10px)] overflow-y-auto">
                <table className="w-[calc(100vw-50px)] border-collapse m-3 text-[var(--table-text)] border border-[var(--table-bg-border)]">
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
