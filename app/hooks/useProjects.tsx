import {
    addProject,
    fetchProjectsByUserId,
    updateProject,
    deleteProject
} from '@/redux/projects/projectThunk';
import { AppDispatch, RootState } from '@/redux/store';
import { IProjectDTO } from '@/types/project';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from './useAuth';
import {
    selectProject as selectProjectAction,
    clearProjects as clearProjectsAction
} from '@/redux/projects/projectSlide';
import { useAppSelector } from '@/redux/hook';

export function useProjects() {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth();
    const userId = useMemo(() => user?._id!, [user?._id]);

    const { projects, selectedProject, status } = useAppSelector(
        (state: RootState) => state.projects
    );

    useEffect(() => {
        if (!userId) return;
        if (projects) return;

        dispatch(fetchProjectsByUserId(userId));
    }, [dispatch, userId, projects]);

    const handleAddProject = async (project: IProjectDTO) => {
        return await dispatch(addProject(project));
    };

    const handleUpdateProject = async (project: IProjectDTO) => {
        return await dispatch(updateProject(project));
    };

    const handleDeleteProject = async (projectId: string) => {
        return await dispatch(deleteProject(projectId));
    };

    const handleSelectProject = (project: IProjectDTO | null) => {
        dispatch(selectProjectAction(project));
    };

    const handleClearProjects = () => {
        dispatch(clearProjectsAction());
    };
    

    return {
        projects,
        selectedProject,
        status,
        selectProject: handleSelectProject,
        clearProjects: handleClearProjects,
        addProject: handleAddProject,
        updateProject: handleUpdateProject,
        deleteProject: handleDeleteProject
    };
}
