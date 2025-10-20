import { IMeetingDTO } from '@/types/meeting';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMeetingsByProjectId = createAsyncThunk<
    IMeetingDTO[], // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>(
    'meetings/fetchByProjectId',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const reponse = await axios.get(
                `/api/projects/${projectId}/meetings`
            );
            return reponse.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getMeetingById = createAsyncThunk<
    IMeetingDTO, // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('meetings/getById', async (id: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.get(`/api/meetings/${id}`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const addMeeting = createAsyncThunk<
    IMeetingDTO, // return type
    IMeetingDTO, // argument type
    { rejectValue: string } // type of custom error payload
>('meetings/add', async (payload: IMeetingDTO, { rejectWithValue }) => {
    try {
        const reponse = await axios.post(
            `/api/projects/${payload.projectId}/meetings`,
            payload
        );
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateMeeting = createAsyncThunk<
    IMeetingDTO, // return type
    IMeetingDTO, // argument type
    { rejectValue: string } // type of custom error payload
>('meetings/update', async (payload: IMeetingDTO, { rejectWithValue }) => {
    try {
        const reponse = await axios.post(
            `/api/meetings/${payload._id}`,
            payload
        );
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteMeeting = createAsyncThunk<
    IMeetingDTO, // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('meetings/delete', async (id: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.delete(`/api/meetings/${id}`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteMeetingsByProjectId = createAsyncThunk<
    IMeetingDTO[], // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>(
    'milestones/deleteByProject',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const reponse = await axios.delete(
                `/api/projects/${projectId}/meetings}`
            );
            return reponse.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
