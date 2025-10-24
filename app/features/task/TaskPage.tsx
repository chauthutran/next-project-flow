import TaskList from './list/TaskList';
import { useState } from 'react';
import TaskFormWrapper from './form/TaskFormWrapper';
import { useTasks } from '@/hooks/useTasks';
import { PROJECT_STEPS } from '../project/ProjectWorkspace';
import PageTitle from '@/components/PageTitle';
import SecondButton from '@/components/buttons/SecondButton';
import { ITaskDTO } from '@/types/task';
import useConfirmDialog from '@/components/dialog/useConfirmDialog';
import useNotifier from '@/hooks/useNotifier';
import AccentButton from '@/components/buttons/AccentButton';
import useListPage from '@/hooks/useListPage';

export default function TaskPage({ projectId }: { projectId: string }) {
    const { tasks, status, selectTask, deleteTask } = useTasks();
    const {
        showForm,
        setShowForm,
        handleAddNew,
        handleEdit,
        handleDelete,
        ConfirmDialogComponent
    } = useListPage<ITaskDTO>({
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

            <div className="bg-white px-6">
                {!showForm && (
                    <>
                        <PageTitle
                            title={projectTitleInfo.label}
                            subtitle={projectTitleInfo.description}
                            icon={<IconComponent />}
                            action={
                                <SecondButton
                                    type="button"
                                    title="+ New Task"
                                    onClick={handleAddNew}
                                />
                            }
                        />
                        <TaskList
                            tasks={tasks}
                            handleOnItemEdit={handleEdit}
                            handleOnDeleteItem={handleDelete}
                        />
                    </>
                )}

                {showForm && (
                    <>
                        <PageTitle
                            title={'Task Form'}
                            subtitle={projectTitleInfo.description}
                            icon={<IconComponent />}
                            action={
                                <AccentButton
                                    type="button"
                                    title="Cancel"
                                    onClick={() => setShowForm(false)}
                                />
                            }
                        />

                        <TaskFormWrapper
                            projectId={projectId}
                            onClose={() => setShowForm(false)}
                            afterSubmit={() => {}}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
