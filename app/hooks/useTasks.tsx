import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProjects } from "./useProjects";
import { addTask, deleteTask, fetchTasksByProjectId, updateTask } from "@/redux/tasks/tasksThunk";
import { ITaskDTO } from "@/types/task";

export function useTasks() {
    const dispatch = useDispatch<AppDispatch>();
    const {selectedProject} = useProjects();
    
    const { tasks, selectedTask, loading, error } = useSelector( (state: RootState) => state.tasks );
    
    useEffect(() => {
        if( selectedProject?._id ) {
            dispatch(fetchTasksByProjectId(selectedProject._id));
        }
    }, [dispatch, selectedProject]);
    
    const handleAddTask = async (payload: ITaskDTO) => {
        return await dispatch(addTask(payload));
    };

    const handleUpdateTask = async (payload: ITaskDTO) => {
        return await dispatch(updateTask(payload));
    };

    const handleDeleteTask = async (id: string) => {
        return await dispatch(deleteTask(id));
    };
    
    return {
        tasks,
        selectedTask,
        loading,
        error,
        addTask: handleAddTask,
        updateTask: handleUpdateTask,
        deleteTask: handleDeleteTask,
    }
}