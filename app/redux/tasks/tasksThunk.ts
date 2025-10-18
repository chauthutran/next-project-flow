import { ITaskDTO } from '@/types/task';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasksByProjectId = createAsyncThunk<
    ITaskDTO[], // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('tasks/fetchByProjectId', async (projectId: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.get(`/api/projects/${projectId}/tasks`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const getTaskById = createAsyncThunk<
    ITaskDTO, // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('tasks/getById', async (id: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.get(`/api/tasks/${id}`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const addTask = createAsyncThunk<
    ITaskDTO, // return type
    ITaskDTO, // argument type
    { rejectValue: string } // type of custom error payload
>('tasks/add', async (payload: ITaskDTO, { rejectWithValue }) => {
    try {
        const reponse = await axios.post(
            `/api/tasks/${payload.projectId}`,
            payload
        );
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateTask = createAsyncThunk<
    ITaskDTO, // return type
    ITaskDTO, // argument type
    { rejectValue: string } // type of custom error payload
>('tasks/update', async (payload: ITaskDTO, { rejectWithValue }) => {
    try {
        const reponse = await axios.post(`/api/tasks`, payload);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteTask = createAsyncThunk<
    ITaskDTO, // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('tasks/delete', async (id: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.delete(`/api/tasks/${id}`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});
