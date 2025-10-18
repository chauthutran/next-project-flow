import { IUser } from '@/models/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const reponse = axios.post('/api/auth/login', credentials);
            return (await reponse).data.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user: Partial<IUser>, { rejectWithValue }) => {
        try {
            const reponse = axios.post('/api/auth/register', user);
            return (await reponse).data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
