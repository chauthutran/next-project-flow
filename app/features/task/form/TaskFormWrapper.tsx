import { JSONObject } from '@/lib/definations';
import useAuth from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import TaskForm from './TaskForm';
import { ITaskDTO } from '@/types/task';
import withFormHandler from '@/hoc/withFormHandler';
import { taskSchema } from './taskSchema';

export default function TaskFormWrapper({
    projectId,
    data = null,
    afterSubmit = () => {}
}: {
    projectId: string;
    data?: JSONObject | null;
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedTask, addTask } = useTasks();

    const TaskFormBasic = withFormHandler<ITaskDTO>(TaskForm, {
        initialValues: {
            name: selectedTask?.name || '',
            description: selectedTask?.description || '',
            startDate: selectedTask?.startDate || '',
            endDate: selectedTask?.endDate || '',
            status: selectedTask?.status || 'not_started',
            createdBy: user!._id!,
            assignedTo: selectedTask?.assignedTo || [],
            projectId: projectId
        },
        validationSchema: taskSchema,
        onSubmit: async (values) => {
            await addTask(values);
            afterSubmit();
        }
    });

    return <TaskFormBasic />;
}
