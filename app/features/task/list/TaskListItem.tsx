import useConfirmDialog from '@/components/dialog/useConfirmDialog';
import { useTasks } from '@/hooks/useTasks';
import { STATUS_DETAILS } from '@/types/status';
import { ITaskDTO } from '@/types/task';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TaskListItem({
    task,
    handleOnItemEdit,
    handleOnDeleteItem
}: {
    task: ITaskDTO;
    handleOnItemEdit: (selected: ITaskDTO) => void;
    handleOnDeleteItem: (task: ITaskDTO) => void;
}) {
    const { selectTask, deleteTask } = useTasks();
    const navigate = useRouter();
    const { openDialog, ConfirmDialogComponent } = useConfirmDialog({
        title: 'Warning'
    });

    const statusInfo = STATUS_DETAILS[task.status];

    return (
        <li className="py-3 flex justify-between items-center">
            <div>
                <p className="font-medium text-gray-800">{task.name}</p>
                <p className="text-sm text-gray-500">
                    {new Date(task.startDate).toLocaleDateString()}
                </p>
            </div>
            <span
                className={`text-xs px-3 py-1 rounded-full 
                    ${statusInfo.bgColor} ${statusInfo.textColor}
                }`}
            >
                {task.status}
            </span>

            <button
                onClick={() => handleOnItemEdit(task)}
                className="text-blue-600 hover:underline"
            >
                Edit
            </button>

            <button
                onClick={() => handleOnDeleteItem(task)}
                className="text-blue-600 hover:underline"
            >
                Delete
            </button>
        </li>
    );
}
