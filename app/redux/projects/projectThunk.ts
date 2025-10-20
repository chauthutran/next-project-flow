import { IProjectDTO } from '@/types/project';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteTasksByProjectId } from '../tasks/tasksThunk';
import { deleteMeetingsByProjectId } from '../meetings/meetingsThunk';
import { deleteMilestonesByProjectId } from '../milestones/milestonesThunk';

export const fetchProjectsByUserId = createAsyncThunk<
    IProjectDTO[], // type of successful return
    string, // type of argument (userId)
    { rejectValue: string } // type of custom error payload
>(
    'projects/fetchProjectsByUserId',
    async (userId: string, { rejectWithValue }) => {
        try {
            const reponse = await axios.get(`/api/projects/user/${userId}`);
            return reponse.data.data as IProjectDTO[];
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addProject = createAsyncThunk<
    IProjectDTO, // return type
    IProjectDTO, // argument type
    { rejectValue: string } // type of custom error payload
>('projects/add', async (project: IProjectDTO, { rejectWithValue }) => {
    try {
        const reponse = await axios.post(`/api/projects`, project);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateProject = createAsyncThunk<
    IProjectDTO, // return type
    IProjectDTO, // argument type
    { rejectValue: string } // type of custom error payload
>('projects/update', async (project: IProjectDTO, { rejectWithValue }) => {
    try {
        const reponse = await axios.put(
            `/api/projects/${project._id}`,
            project
        );
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const retrieveProjectById = createAsyncThunk<
    IProjectDTO, // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('projects/getById', async (id: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.get(`/api/projects/${id}`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteProject = createAsyncThunk<
    IProjectDTO, // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('projects/delete', async (id: string, { dispatch, rejectWithValue }) => {
    try {
        // Delete related data first
        await Promise.all([
            dispatch(deleteTasksByProjectId(id)).unwrap(),
            dispatch(deleteMeetingsByProjectId(id)).unwrap(),
            dispatch(deleteMilestonesByProjectId(id)).unwrap()
        ]);

        // Then delete the project itself
        const reponse = await axios.delete(`/api/projects/${id}`);

        // Return deleted project
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(
            error.response.data.message || 'Failed to delete project'
        );
    }
});
