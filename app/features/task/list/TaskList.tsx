import { ITaskDTO } from '@/types/task';
import TaskTableRow from './TaskListItem';

export default function TaskList({ tasks }: { tasks: ITaskDTO[] }) {
   
    return (
        <div className="overflow-hidden rounded-lg">
            <ul className="divide-y divide-[var(--border)]">
                {/* <TaskTableHeader /> */}
                {tasks.map((task: ITaskDTO) => (
                    <TaskTableRow key={task._id} task={task} />
                ))}
            </ul>
        </div>
    );
}
