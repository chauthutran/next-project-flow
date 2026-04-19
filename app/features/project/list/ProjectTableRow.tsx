import AccentButton from '@/app/components/buttons/AccentButton';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import { IProjectDTO } from '@/app/types/project';
import { STATUS_DETAILS } from '@/app/types/status';
import { useRouter } from 'next/navigation';

interface ProjectTableRowProps {
    project: IProjectDTO;
    handleOnDeleteItem: (project: IProjectDTO) => void;
}

export default function ProjectTableRow({
    project,
    handleOnDeleteItem
}: ProjectTableRowProps) {
    const navigate = useRouter();

    const handleEditOnClick = () => {
        navigate.push(`/pages/projects/${project._id}`);
    };

    const statusInfo = STATUS_DETAILS[project.status];
    return (
        <tr
            key={project._id}
            className="transition-colors bg-[var(--table-row-bg)] hover:bg-[var(--table-row-hover)] border-b border-[var(--table-row-border)]"
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
                <div className="text-[var(--table-sub-text)] text-sm">
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
