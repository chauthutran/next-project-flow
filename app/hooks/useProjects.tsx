import {
    addProject,
    fetchProjectsByUserId,
    updateProject,
    deleteProject,
    fetchProjectById
} from '@/app/redux/projects/projectThunk';
import { AppDispatch, RootState } from '@/app/redux/store';
import { IProjectDTO } from '@/app/types/project';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from './useAuth';
import {
    selectProject as selectProjectAction,
    clearProjects as clearProjectsAction
} from '@/app/redux/projects/projectSlide';
import { useAppSelector } from '@/app/redux/hook';

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

    const handleFetchProject = async (projectId: string) => {
        dispatch(fetchProjectById(projectId));
    };

    const handleAddProject = async (project: IProjectDTO) => {
        dispatch(addProject(project));
    };

    const handleUpdateProject = async (project: IProjectDTO) => {
        const result = await dispatch(updateProject(project));
    };

    const handleDeleteProject = async (projectId: string) => {
        dispatch(deleteProject(projectId));
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
        fetchProjectById: handleFetchProject,
        addProject: handleAddProject,
        updateProject: handleUpdateProject,
        deleteProject: handleDeleteProject
    };
}
