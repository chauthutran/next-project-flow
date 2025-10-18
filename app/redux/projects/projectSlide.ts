import { IProjectDTO } from '@/types/project';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addProject,
    deleteProject,
    fetchProjectsByUserId,
    updateProject
} from './projectThunk';

interface ProjectState {
    projects: IProjectDTO[] | null;
    loading: boolean;
    error: string | null;
    selectedProject: IProjectDTO | null;
}

const initialState: ProjectState = {
    projects: null,
    loading: false,
    error: null,
    selectedProject: null
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        selectProject: (state, action: PayloadAction<IProjectDTO | null>) => {
            state.selectedProject = action.payload;
        },
        clearProjects: (state) => {
            state.projects = null;
            state.selectedProject = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchProjectsByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchProjectsByUserId.fulfilled,
                (state, action: PayloadAction<IProjectDTO[]>) => {
                    state.loading = false;
                    state.projects = action.payload || [];
                }
            )
            .addCase(fetchProjectsByUserId.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Fetch projects failed';
            })
            // Create
            .addCase(addProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                addProject.fulfilled,
                (state, action: PayloadAction<IProjectDTO>) => {
                    state.loading = false;
                    state.selectedProject = action.payload;
                    state.projects!.push(action.payload);
                }
            )
            .addCase(addProject.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Add projects failed';
            })
            // Update
            .addCase(updateProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateProject.fulfilled,
                (state, action: PayloadAction<IProjectDTO>) => {
                    state.selectedProject = action.payload;
                    
                    const index = state.projects!.findIndex(
                        (p) => p._id! === action.payload._id
                    );
                    if (index >= 0) state.projects![index] = action.payload;
                }
            )
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Update project failed';
            })
            // Delete
            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteProject.fulfilled,
                (state, action: PayloadAction<IProjectDTO>) => {
                    state.projects = state.projects!.filter(
                        (p) => p._id !== action.payload._id
                    );
                }
            )
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Delete project failed';
            });
    }
});

export const { selectProject, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
