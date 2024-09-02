import { useAuth } from "@/contexts/AuthContext";
import { JSONObject } from "@/lib/definations";
import { useState } from "react";
import * as Constant from "@/lib/constant";
import { addTask } from "@/lib/dbService";


export default function TaskForm({ projectId, onSuccessSubmit }: { projectId: string, onSuccessSubmit: () => void }) {

    const { user } = useAuth();

    const [formData, setFormData] = useState<JSONObject>({
        projectId: projectId,
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'not_started',
        assignedTo: [],
    });

    console.log(formData);
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

    const handleSubmit = async(e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
       
        const response: JSONObject = addTask(formData);
        if( response.status !== "success" ) {
            alert(response.message);
        }
        else {
            alert("Add task successfully !");
        }
    };
    
    return (
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Create New Task</h2>

            {/* Task Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Task Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows={4}
                    required
                />
            </div>

            {/* Start Date */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            {/* End Date */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            {/* Status */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value={Constant.TASK_STATUS_NOT_STARTED}>Not Started</option>
                    <option value={Constant.TASK_STATUS_IN_PROGRESS}>In Progress</option>
                    <option value={Constant.TASK_STATUS_COMPLETED}>Completed</option>
                </select>
            </div>

            {/* Assigned To */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Assign to Users</label>
                <select
                    multiple
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleUserSelection}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    {user!.teamMembers.map((member: JSONObject) => (
                        <option key={member._id} value={member._id}>
                            {member.email}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Create Task
                </button>
            </div>
        </form>
    );
}