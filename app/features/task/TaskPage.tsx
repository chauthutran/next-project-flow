import { JSONObject } from '@/lib/definations';
import TaskForm from './form/TaskForm';
import TaskList from './list/TaskList';
import { useState } from 'react';
import { GrFormAdd } from 'react-icons/gr';
import { IoIosAddCircle } from 'react-icons/io';
import Modal from '@/components/Modal';
import { IoClose } from 'react-icons/io5';
import { IoIosCloseCircle } from 'react-icons/io';
import TaskFormWrapper from './form/TaskFormWrapper';
import { useTasks } from '@/hooks/useTasks';

export default function TaskPage({ projectId }: { projectId: string }) {
    const { tasks, loading } = useTasks();
    const [showTaskForm, setShowTaskForm] = useState(false);

    if (loading || !tasks) return <div>Loading tasks... </div>;

    return (
        <div>
            {!showTaskForm && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Task List
                        </h2>
                        <button
                            onClick={() => setShowTaskForm(true)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                            <IoIosAddCircle className="size-5" />
                            New
                        </button>
                    </div>

                    <TaskList tasks={tasks} />
                </>
            )}

            {showTaskForm && (
                <div className="">
                    <nav
                        className="text-[var(--link-text mb-2"
                        aria-label="Breadcrumb"
                    >
                        <ol className="inline-flex items-center space-x-2">
                            <li
                                className="hover:text-[var(--link-hover-text)] transition-colors font-medium cursor-pointer"
                                onClick={() => setShowTaskForm(false)}
                            >
                                List
                            </li>
                            <li>
                                <span className="text-[var(--link-text)]">
                                    ›
                                </span>
                            </li>
                            <li className="text-[var(--link-active-text)] font-medium">
                                Task Form
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
