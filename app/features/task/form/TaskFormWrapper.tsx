import useAuth from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import TaskForm from './TaskForm';
import { ITaskDTO } from '@/types/task';
import withFormHandler from '@/hoc/formHandler/withFormHandler';
import { taskSchema } from './taskSchema';
import useNotifier from '@/hooks/useNotifier';
import { FormikHelpers } from 'formik';

export interface ITaskFormDataProps extends ITaskDTO {
    submitType?: 'save' | 'save_continue';
}

export default function TaskFormWrapper({
    projectId,
    onClose,
    afterSubmit = () => {}
}: {
    projectId: string;
    onClose: () => void;
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedTask, addTask, updateTask, selectTask, status } =
        useTasks();

    useNotifier(selectedTask ? status.update : status.add);

    const loading = selectedTask
        ? !!status.update.loading
        : !!status.add.loading;

    const TaskFormBasic = withFormHandler<
        ITaskFormDataProps,
        { onClose: () => void }
    >(TaskForm, {
        initialValues: {
            projectId: projectId,
            name: selectedTask?.name || '',
            description: selectedTask?.description || '',
            startDate: selectedTask?.startDate.split('T')[0] || '',
            endDate: selectedTask?.endDate.split('T')[0] || '',
            status: selectedTask?.status || 'not_started',
            createdBy: user!._id!,
            assignedTo: selectedTask?.assignedTo || [],
            submitType: 'save'
        },
        validationSchema: taskSchema,
        getLoading: () => loading,
        onSubmit: async (
            values,
            { resetForm }: FormikHelpers<ITaskFormDataProps>
        ) => {
            if (selectedTask) {
                const payload = {
                    ...values,
                    _id: selectedTask._id
                };
                await updateTask(payload);
            } else {
                await addTask(values);
            }

            // if (values.submitType === 'save') {
            //     console.log('Saving:', values);
            // } else
            if (values.submitType === 'save_continue') {
                selectTask(null);
                resetForm();
            }
            afterSubmit();
        }
    });

    return <TaskFormBasic onClose={onClose} />;
}
