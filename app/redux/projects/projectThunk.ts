import { IProjectDTO } from '@/types/project';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
>('projects/delete', async (id: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.delete(`/api/projects/${id}`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
