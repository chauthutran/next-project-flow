import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProjects } from './useProjects';
import {
    addTask,
    deleteTask,
    fetchTasksByProjectId,
    updateTask
} from '@/redux/tasks/tasksThunk';
import { ITaskDTO } from '@/types/task';
import { useAppSelector } from '@/redux/hook';
import {
    selectTask as selectTaskAction,
    clearTasks as clearTasksAction,
} from '@/redux/tasks/taskSlides';

export function useTasks() {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedProject } = useProjects();

    const { tasks, selectedTask, status} = useAppSelector(
        (state: RootState) => state.tasks
    );

    useEffect(() => {
        if (selectedProject?._id && !tasks) {
            dispatch(fetchTasksByProjectId(selectedProject._id));
        }
    }, [dispatch, selectedProject, tasks]);

    const handleAddTask = async (payload: ITaskDTO) => {
        return await dispatch(addTask(payload));
    };

    const handleUpdateTask = async (payload: ITaskDTO) => {
        return await dispatch(updateTask(payload));
    };

    const handleDeleteTask = async (id: string) => {
        return await dispatch(deleteTask(id));
    };

    const handleSelectTask = (task: ITaskDTO | null) => {
        dispatch(selectTaskAction(task));
    };

    const handleClearTasks = () => {
        dispatch(clearTasksAction());
    };

    return {
        tasks,
        selectedTask,
        status,
        selectTask: handleSelectTask,
        clearTasks: handleClearTasks,
        addTask: handleAddTask,
        updateTask: handleUpdateTask,
        deleteTask: handleDeleteTask
    };
}
