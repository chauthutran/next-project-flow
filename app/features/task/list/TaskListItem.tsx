import { useTasks } from '@/hooks/useTasks';
import { STATUS_DETAILS } from '@/types/status';
import { ITaskDTO } from '@/types/task';
import { useRouter } from 'next/navigation';

export default function TaskListItem({ task }: { task: ITaskDTO }) {
    const { selectTask } = useTasks();
    const navigate = useRouter();

    const handleEditOnClick = () => {
        selectTask(task);
        navigate.push(`/pages/task/${task._id}`);
    };
    
    const statusInfo = STATUS_DETAILS[task.status];

    return (
        <li className="py-3 flex justify-between items-center">
            <div>
                <p className="font-medium text-gray-800">{task.name}</p>
                <p className="text-sm text-gray-500">{new Date(task.startDate).toLocaleDateString()}</p>
            </div>
            <span
                className={`text-xs px-3 py-1 rounded-full 
                        ${statusInfo.bgColor} ${statusInfo.textColor} 
                }`}
            >
                {task.status}
            </span>
        </li>
    );
}
