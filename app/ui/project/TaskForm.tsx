import { useAuth } from "@/contexts/AuthContext";
import { JSONObject } from "@/lib/definations";
import { useState } from "react";
import * as Constant from "@/lib/constant";
import { addTask } from "@/lib/dbService";


export default function TaskForm({ projectId, onSuccess }: { projectId: string, onSuccess: (newTask: JSONObject) => void }) {

    const { user } = useAuth();

    const [formData, setFormData] = useState<JSONObject>({
        projectId: projectId,
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'not_started',
        assignedTo: [],
        createdBy: user!._id
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUserSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUsers = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            assignedTo: selectedUsers,
        });
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const response: JSONObject = await addTask(formData);
        console.log(response);
        if (response.status !== "success") {
            alert(response.message);
        }
        else {
            // Need to update the project details data
            alert("Add task successfully !");
            onSuccess(response.data);
        }
    };

    return (
        <div className="bg-white w-full">
            <h2 className="text-2xl font-semibold mb-6 flex justify-center border-b-2 border-light-sky-blue pb-2 w-fit pr-5">Create New Task</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border bg-gray-100 p-4 rounded">
                {/* Task Name */}
                <div>
                    <label className="mb-2 text-sm font-medium mt-2">Task Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-300 p-2 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 text-sm font-medium mt-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-300 p-2 text-sm outline-2 placeholder:text-gray-500 h-9"
                        required
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label className="mb-2 text-sm font-medium mt-2">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-300 p-2 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="mb-2 text-sm font-medium mt-2">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-300 p-2 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="grid grid-cols-1 space-y-2 rounded-md border border-gray-300 p-2 bg-white">
                        <label className="inline-flex items-center text-xs font-medium">
                            <input
                                type="radio"
                                name="status"
                                value={Constant.TASK_STATUS_NOT_STARTED}
                                checked={formData.status === Constant.TASK_STATUS_NOT_STARTED}
                                onChange={handleChange}
                                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                required
                            />
                            <span className="ml-2">Not Started</span>
                        </label>

                        <label className="inline-flex items-center text-xs font-medium">
                            <input
                                type="radio"
                                name="status"
                                value={Constant.TASK_STATUS_IN_PROGRESS}
                                checked={formData.status === Constant.TASK_STATUS_IN_PROGRESS}
                                onChange={handleChange}
                                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                required
                            />
                            <span className="ml-2">In Progress</span>
                        </label>

                        <label className="inline-flex items-center text-xs font-medium">
                            <input
                                type="radio"
                                name="status"
                                value={Constant.TASK_STATUS_COMPLETED}
                                checked={formData.status === Constant.TASK_STATUS_COMPLETED}
                                onChange={handleChange}
                                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                required
                            />
                            <span className="ml-2">Completed</span>
                        </label>
                    </div>
                </div>

                {/* Assigned To */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Assign to Users</label>
                    <select
                        multiple
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleUserSelection}
                          className="peer block w-full rounded-md border border-gray-300 p-2 text-sm outline-2 placeholder:text-gray-500"
                        required
                    >
                        {user!.teamMembers.map((member: JSONObject) => (
                            <option key={member._id} value={member._id}>
                                {member.email}
                            </option>
                        ))}
                    </select>
                </div>

            </div>


            <div className="mt-3">
                <button
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
                >
                    Create Task
                </button>
            </div>
        </div>

    );
}