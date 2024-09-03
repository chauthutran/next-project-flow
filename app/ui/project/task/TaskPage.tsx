import { JSONObject } from "@/lib/definations";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function TaskPage({projectId, data, onSuccess}: {projectId: string, data: JSONObject, onSuccess: (newTask: JSONObject) => void }) {

    const taskList = (data.tasks !== undefined ) ? data.tasks : [];
    
    return (
        <div className="bg-white w-full">
            <h2 className="text-2xl font-semibold mb-6 flex justify-center border-b-2 border-light-sky-blue pb-2 w-fit pr-5">Task List</h2>

            <TaskList data={data.tasks} />

            <TaskForm projectId={projectId} onSuccess={(newTask: JSONObject) => onSuccess(newTask) } />

        </div>
    )
}