import TaskList from './list/TaskList';
import TaskFormWrapper from './form/TaskFormWrapper';
import { useTasks } from '@/app/hooks/useTasks';
import { PROJECT_STEPS } from '../project/ProjectWorkspace';
import PageTitle from '@/app/components/PageTitle';
import SecondButton from '@/app/components/buttons/SecondButton';
import { ITaskDTO } from '@/app/types/task';
import AccentButton from '@/app/components/buttons/AccentButton';
import useResourcePage from '@/app/hooks/useResourcePage';

export default function TaskPage({ projectId }: { projectId: string }) {
    const { tasks, status, selectTask, deleteTask } = useTasks();
    const {
        showForm,
        handleCloseForm,
        handleAddNew,
        handleEdit,
        handleDelete,
        ConfirmDialogComponent
    } = useResourcePage<ITaskDTO>({
        deleteFn: deleteTask,
        deleteStatus: status.delete,
        selectFn: selectTask
    });

    if (status.fetch.loading || !tasks)
        return <div>{status.fetch.loading}... </div>;

    const projectTitleInfo = PROJECT_STEPS[1];
    const IconComponent = projectTitleInfo.icon;

    return (
        <div>
            {ConfirmDialogComponent}

            <div className="bg-white">
                <PageTitle
                    title={showForm ? 'Task Form' : 'Tasks'}
                    subtitle={projectTitleInfo.description}
                    icon={<IconComponent />}
                    action={
                        showForm ? (
                            <AccentButton
                                type="button"
                                title="Cancel"
                                onClick={handleCloseForm}
                            />
                        ) : (
                            <SecondButton
                                type="button"
                                title="+ New Task"
                                onClick={handleAddNew}
                            />
                        )
                    }
                />


                {showForm ?  
                    <TaskFormWrapper
                        projectId={projectId}
                        onClose={handleCloseForm}
                        afterSubmit={() => {}}
                    />
                    :  <TaskList
                        tasks={tasks}
                        handleOnItemEdit={handleEdit}
                        handleOnDeleteItem={handleDelete}
                    />
                }
            </div>
        </div>
    );
}
