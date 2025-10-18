import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authThunk';
import { IUserDTO } from '@/types/user';

interface AuthState {
    user: IUserDTO | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            console.log("=== logoutUser - state", state);
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<IUserDTO>) => {
                    state.loading = false;
                    state.user = action.payload;
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Login Failed';
            })
            // register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<IUserDTO>) => {
                    state.loading = true;
                    state.user = action.payload;
                }
            )
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Registration failed';
            });
    }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
