import { ITaskDTO } from '@/types/task';
import TaskTableRow from './TaskListItem';

export default function TaskList({
    tasks,
    handleOnItemEdit,
    handleOnDeleteItem,
}: {
    tasks: ITaskDTO[];
    handleOnItemEdit: (selected: ITaskDTO) => void;
    handleOnDeleteItem: (task: ITaskDTO) => void;
}) {
    return (
        <div className="overflow-hidden rounded-lg">
            <ul className="divide-y divide-[var(--border)]">
                {/* <TaskTableHeader /> */}
                {tasks.map((task: ITaskDTO) => (
                    <TaskTableRow
                        key={task._id}
                        task={task}
                        handleOnItemEdit={handleOnItemEdit}
                        handleOnDeleteItem={handleOnDeleteItem}
                    />
                ))}
            </ul>
        </div>
    );
}
