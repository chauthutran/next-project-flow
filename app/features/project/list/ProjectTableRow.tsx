import AccentButton from '@/components/buttons/AccentButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import useConfirmDialog from '@/components/dialog/useConfirmDialog';
import { useProjects } from '@/hooks/useProjects';
import { IProjectDTO } from '@/types/project';
import { STATUS_DETAILS } from '@/types/status';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface ProjectTableRowProps {
    project: IProjectDTO;
    handleOnDeleteItem: (project: IProjectDTO) => void;
}

export default function ProjectTableRow({
    project,
    handleOnDeleteItem
}: ProjectTableRowProps) {
    const { selectProject } = useProjects();
    const navigate = useRouter();

    const handleEditOnClick = () => {
        selectProject(project);
        navigate.push(`/pages/projects/${project._id}`);
    };

    const statusInfo = STATUS_DETAILS[project.status];
    return (
        <tr
            key={project._id}
            className="transition-colors hover:bg-[var(--primary-hover-light)]"
        >
            <td className="px-4 py-2">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                        ${statusInfo.bgColor} ${statusInfo.textColor}
                    }`}
                >
                    {statusInfo.name.toUpperCase()}
                </span>
            </td>
            <td className="px-4 py-2 flex flex-col">
                <div>{project.name}</div>
                <div className="text-[var(--muted)] text-sm">
                    {new Date(project.startDate).toLocaleDateString()} →{' '}
                    {new Date(project.endDate).toLocaleDateString()}
                </div>
            </td>
            <td className="px-4 py-2">
                {project.teamMembers.map((member, idx) => (
                    <p key={`m_${idx}`}>{member}</p>
                ))}
            </td>
            <td className="space-x-2 whitespace-nowrap">
                <PrimaryButton title="Edit" onClick={handleEditOnClick} />
                <AccentButton
                    title="Delete"
                    onClick={() => handleOnDeleteItem(project)}
                />
            </td>
        </tr>
    );
}
