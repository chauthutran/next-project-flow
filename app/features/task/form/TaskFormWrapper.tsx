import useAuth from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import TaskForm from './TaskForm';
import { ITaskDTO } from '@/types/task';
import withFormHandler from '@/hoc/withFormHandler';
import { taskSchema } from './taskSchema';

export default function TaskFormWrapper({
    projectId,
    afterSubmit = () => {}
}: {
    projectId: string;
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedTask, addTask, updateTask, loading } = useTasks();

    const TaskFormBasic = withFormHandler<ITaskDTO>(TaskForm, {
        initialValues: {
            projectId: projectId,
            name: selectedTask?.name || '',
            description: selectedTask?.description || '',
            startDate: selectedTask?.startDate.split('T')[0] || '',
            endDate: selectedTask?.endDate.split('T')[0] || '',
            status: selectedTask?.status || 'not_started',
            createdBy: user!._id!,
            assignedTo: selectedTask?.assignedTo || []
        },
        validationSchema: taskSchema,
        getLoading: () => !!loading,
        onSubmit: async (values) => {
            if (selectedTask) {
                const payload = {
                    ...values,
                    _id: selectedTask._id
                };
                await updateTask(payload);
            } else {
                await addTask(values);
            }
            afterSubmit();
        }
    });

    return <TaskFormBasic />;
}
