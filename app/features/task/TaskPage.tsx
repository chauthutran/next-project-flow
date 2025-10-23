import TaskList from './list/TaskList';
import { useState } from 'react';
import TaskFormWrapper from './form/TaskFormWrapper';
import { useTasks } from '@/hooks/useTasks';
import { PROJECT_STEPS } from '../project/ProjectWorkspace';
import PageTitle from '@/components/PageTitle';
import SecondButton from '@/components/buttons/SecondButton';
import { ITaskDTO } from '@/types/task';
import useConfirmDialog from '@/components/dialog/useConfirmDialog';
import useNofifier from '@/hooks/useNotifier';

export default function TaskPage({ projectId }: { projectId: string }) {
    const { tasks, status, selectTask, selectedTask, deleteTask } = useTasks();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const { openDialog, ConfirmDialogComponent } = useConfirmDialog({
        title: 'Warning'
    });
    
    useNofifier(status.delete);
    // useNofifier(selectedTask ? status.update : status.add);
    
    const handleOnItemEdit = (selected: ITaskDTO) => {
        selectTask(selected);
        setShowTaskForm(true);
    };

    const handleShowAddTaskForm = () => {
        selectTask(null);
        setShowTaskForm(true);
    }
    
    const handleOnDeleteItem = async (task: ITaskDTO) => {
        openDialog(
            () => deleteTask(task._id!),
            `Are you sure you want to delete "${task.name}"?`
        );
    };

    if (status.fetch.loading || !tasks)
        return <div>{status.fetch.loading}... </div>;

    const projectTitleInfo = PROJECT_STEPS[1];
    const IconComponent = projectTitleInfo.icon;

    return (
        <div>
            {ConfirmDialogComponent}
            
            <PageTitle
                title={projectTitleInfo.label}
                subtitle={projectTitleInfo.description}
                icon={<IconComponent />}
                action={
                    <SecondButton
                        type="button"
                        title="+ New Project"
                        onClick={handleShowAddTaskForm}
                    />
                }
            />

            {!showTaskForm && (
                <TaskList
                    tasks={tasks}
                    handleOnItemEdit={handleOnItemEdit}
                    handleOnDeleteItem={handleOnDeleteItem}
                />
            )}

            {showTaskForm && (
                <div className="">
                    <nav
                        className="text-[var(--link-text)] mb-2"
                        aria-label="Breadcrumb"
                    >
                        <ol className="inline-flex items-center space-x-2">
                            <li
                                className="hover:text-[var(--link-hover-text)] transition-colors font-medium cursor-pointer"
                                onClick={() => setShowTaskForm(false)}
                            >
                                Task List
                            </li>
                            <li>
                                <span className="text-[var(--link-text)]">
                                    ›
                                </span>
                            </li>
                            <li className="text-[var(--link-active-text)] font-medium">
                                Form
                            </li>
                        </ol>
                    </nav>

                    <div className="">
                        <TaskFormWrapper
                            projectId={projectId}
                            onClose={() => setShowTaskForm(false)}
                            afterSubmit={() => {}}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
