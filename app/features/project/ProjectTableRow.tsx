import { useProjects } from '@/hooks/useProjects';
import { IProjectDTO } from '@/types/project';
import { useRouter } from 'next/navigation';

interface ProjectTableRowProps {
    project: IProjectDTO;
}

export default function ProjectTableRow({ project }: ProjectTableRowProps) {
    const { selectProject } = useProjects();
    const navigate = useRouter();

    const handleEditOnClick = () => {
        selectProject(project);
        navigate.push(`/pages/projects/${project._id}`);
    };

    return (
        <tr
            key={project._id}
            className="transition-colors hover:bg-[var(--primary-hover-light)]"
        >
            <td className="px-4 py-2">{project.name}</td>
            <td className="px-4 py-2">
                {project.teamMembers.map((member, idx) => (
                    <p key={`m_${idx}`}>{member}</p>
                ))}
            </td>
            <td className="px-4 py-2">
                {new Date(project.startDate).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">
                {new Date(project.endDate).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'in_progress'
                            ? 'bg-[var(--info)]/20 text-[var(--info-light)]'
                            : project.status === 'completed'
                            ? 'bg-[var(--success-light)] text-[var(--success)]'
                            : 'bg-[var(--error-light)] text-[var(--error)]'
                    }`}
                >
                    {project.status.toUpperCase()}
                </span>
            </td>
            <td className="flex space-x-2 whitespace-nowrap">
                <button
                    className="px-3 py-1 rounded bg-[var(--primary)] text-[var(--primary-text)] hover:bg-[var(--primary-hover)] transition"
                    onClick={handleEditOnClick}
                >
                    View
                </button>
                <button className="px-3 py-1 rounded bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition">
                    Edit
                </button>
            </td>
        </tr>
    );
}
