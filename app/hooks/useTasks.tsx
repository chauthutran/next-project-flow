import { AppDispatch, RootState } from '@/app/redux/store';
import { useEffect, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProjects } from './useProjects';
import {
    addTask,
    deleteTask,
    fetchTasksByProjectId,
    updateTask
} from '@/app/redux/tasks/tasksThunk';
import { ITaskDTO } from '@/app/types/task';
import { useAppSelector } from '@/app/redux/hook';
import {
    selectTask as selectTaskAction,
    clearTasks as clearTasksAction,
} from '@/app/redux/tasks/taskSlides';

export function useTasks() {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedProject } = useProjects();

    const { activeTasks, tasks, selectedTask, status} = useAppSelector(
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

    // const getAllActiveTasks = (userId: string) => {
    //     dispatch(fetchTasksByStatusesAndUser({userId, statuses: ['not_started', 'in_progress']}));
    // }
    
    // const getAllCompletedTasks = (userId: string) => {
    //     dispatch(fetchTasksByStatusesAndUser({userId, statuses: ['completed']}));
    // }
    
    return {
        tasks,
        activeTasks,
        selectedTask,
        status,
        selectTask: handleSelectTask,
        clearTasks: handleClearTasks,
        addTask: handleAddTask,
        updateTask: handleUpdateTask,
        deleteTask: handleDeleteTask,
        // getAllActiveTasks,
        // getAllCompletedTasks
    };
}
