import { IMilestoneDTO } from '@/app/types/milestone';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMilestonesByProjectId = createAsyncThunk<
    IMilestoneDTO[], // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>(
    'milestones/fetchByProjectId',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const reponse = await axios.get(
                `/api/projects/${projectId}/milestones`
            );
            return reponse.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getMilestoneById = createAsyncThunk<
    IMilestoneDTO, // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('milestones/getById', async (id: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.get(`/api/meetings/${id}`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const addMilestone = createAsyncThunk<
    IMilestoneDTO, // return type
    IMilestoneDTO, // argument type
    { rejectValue: string } // type of custom error payload
>('milestones/add', async (payload: IMilestoneDTO, { rejectWithValue }) => {
    try {
        const reponse = await axios.post(
            `/api/projects/${payload.projectId}/milestones`,
            payload
        );
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateMilestone = createAsyncThunk<
    IMilestoneDTO, // return type
    IMilestoneDTO, // argument type
    { rejectValue: string } // type of custom error payload
>('milestones/update', async (payload: IMilestoneDTO, { rejectWithValue }) => {
    try {
        const reponse = await axios.post(
            `/api/milestones/${payload._id}`,
            payload
        );
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteMilestone = createAsyncThunk<
    IMilestoneDTO, // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>('milestones/delete', async (id: string, { rejectWithValue }) => {
    try {
        const reponse = await axios.delete(`/api/milestones/${id}`);
        return reponse.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteMilestonesByProjectId = createAsyncThunk<
    IMilestoneDTO[], // return type
    string, // argument type
    { rejectValue: string } // type of custom error payload
>(
    'milestones/deleteByProject',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const reponse = await axios.delete(
                `/api/projects/${projectId}/milestones}`
            );
            return reponse.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
