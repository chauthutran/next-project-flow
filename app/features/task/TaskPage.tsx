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
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Task List</h2>
                <button
                    onClick={() => setShowTaskForm(true)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                    <IoIosAddCircle className="size-5" />
                    New
                </button>
            </div>

            <TaskList tasks={tasks} />

            {showTaskForm && (
                <Modal>
                    <div className="bg-white rounded-lg w-3/4">
                        <h2 className="py-3 px-5 text-xl flex bg-blue-navy text-white rounded-t-lg items-center justify-between">
                            <div>Create New Task</div>
                            <div
                                className="flex cursor-pointer"
                                onClick={() => setShowTaskForm(false)}
                            >
                                <IoIosCloseCircle className="size-6" />
                            </div>
                        </h2>

                        <div className="p-5 rounded-md bg-gray-100">
                            <TaskFormWrapper
                                projectId={projectId}
                                afterSubmit={() => {}}
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
