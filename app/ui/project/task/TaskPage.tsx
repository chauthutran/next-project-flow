import { JSONObject } from "@/lib/definations";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "@/ui/basics/Modal";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";


export default function TaskPage({projectId, data, onSuccess}: {projectId: string, data: JSONObject, onSuccess: (newTask: JSONObject) => void }) {

    const taskList = (data.tasks !== undefined ) ? data.tasks : [];
    
    const [showTaskForm, setShowTaskForm] = useState(false);

    return (
        <div className="bg-white w-full">
            <h2 className="text-2xl font-semibold mb-6 flex space-x-3">
                <div className="border-b-2 border-light-sky-blue pb-2 w-fit pr-5">Task List</div>
                <div className="flex flex-1 items-end justify-end cursor-pointer hover:text-royal-blue text-blue-navy" onClick={() => setShowTaskForm(true)}><IoIosAddCircle className="size-10" /></div>
            </h2>

            <TaskList data={taskList} />

            {showTaskForm && <Modal>
                <div className="bg-white rounded-lg">
                    <h2 className="p-5 text-2xl flex bg-light-sky-blue rounded-t-lg items-center justify-between">
                        <div>Create New Task</div>
                        <div className="flex cursor-pointer" onClick={() => setShowTaskForm(false)}>
                            <IoIosCloseCircle />
                        </div>
                    </h2>

                        <div className="p-5 rounded-md bg-pale-blue">
                            <TaskForm projectId={projectId} onSuccess={(newTask: JSONObject) => onSuccess(newTask) } />
                        </div>
                    </div>
            </Modal>}

        </div>
    )
}