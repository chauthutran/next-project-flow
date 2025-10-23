import { IProjectDTO } from '@/types/project';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addProject,
    deleteProject,
    fetchProjectById,
    fetchProjectsByUserId,
    updateProject
} from './projectThunk';
import { ILoadingState } from '@/types/loadingState';

interface ProjectState {
    projects: IProjectDTO[] | null;
    status: {
        fetch: ILoadingState;
        add: ILoadingState;
        update: ILoadingState;
        delete: ILoadingState;
        deleteAll: ILoadingState;
    };
    selectedProject: IProjectDTO | null;
}

const initialState: ProjectState = {
    projects: null,
    status: {
        fetch: {},
        add: {},
        update: {},
        delete: {},
        deleteAll: {}
    },
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
        },
        setProjectFetchStatus: (
            state,
            action: PayloadAction<ILoadingState>
        ) => {
            state.status.fetch = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchProjectsByUserId.pending, (state) => {
                state.status.fetch.loading = 'Fetch projects ...';
                state.status.fetch.success = null;
                state.status.fetch.error = null;
            })
            .addCase(
                fetchProjectsByUserId.fulfilled,
                (state, action: PayloadAction<IProjectDTO[]>) => {
                    state.status.fetch.loading = null;
                    state.status.fetch.success = 'Fetch projects successully!';
                    state.projects = action.payload || [];
                }
            )
            .addCase(fetchProjectsByUserId.rejected, (state, action) => {
                state.status.fetch.loading = null;
                state.status.fetch.error =
                    action.error.message ?? 'Fetch projects failed';
            })
            
            // Fetch a project by ID
            .addCase(fetchProjectById.pending, (state) => {
                state.status.fetch.loading = 'Fetching project ...';
                state.status.fetch.success = null;
                state.status.fetch.error = null;
            })
            .addCase(
                fetchProjectById.fulfilled,
                (state, action: PayloadAction<IProjectDTO>) => {
                    state.status.fetch.loading = null;
                    state.status.fetch.success = 'Fetch project successully!';
                    state.selectedProject = action.payload;
                }
            )
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.status.fetch.loading = null;
                state.status.fetch.error =
                    action.error.message ?? 'Fetch project failed';
            })
            
            // Create
            .addCase(addProject.pending, (state) => {
                state.status.add.loading = 'Adding ...';
                state.status.add.success = null;
                state.status.add.error = null;
            })
            .addCase(
                addProject.fulfilled,
                (state, action: PayloadAction<IProjectDTO>) => {
                    state.selectedProject = action.payload;
                    state.projects!.push(action.payload);

                    state.status.add.loading = null;
                    state.status.add.success = 'Project added successfully!';
                }
            )
            .addCase(addProject.rejected, (state, action) => {
                state.status.add.loading = null;
                state.status.add.error =
                    action.error.message ?? 'Add project failed';
            })
            // Update
            .addCase(updateProject.pending, (state) => {
                state.status.update = {
                    loading: 'Updating project ...',
                    error: null,
                    success: null
                };
            })
            .addCase(
                updateProject.fulfilled,
                (state, action: PayloadAction<IProjectDTO>) => {
                    // Set selected project
                    state.selectedProject = action.payload;

                    // Update in the list
                    state.projects = state.projects!.map(p =>
                        p._id === action.payload._id ? action.payload : p
                    );
                    // Update state
                    state.status.update = {
                        loading: null,
                        error: null,
                        success: 'Project updated successfully!'
                    };
                }
            )
            .addCase(updateProject.rejected, (state, action) => {
                state.status.update = {
                    loading: null,
                    success: null,
                    error: action.error.message ?? 'Update project failed'
                };
            })
            // Delete
            .addCase(deleteProject.pending, (state) => {
                // Start deleting project
                state.status.delete.loading =
                    'Deleting project and data related...';
                state.status.delete.success = null;
                state.status.delete.error = null;
            })
            .addCase(
                deleteProject.fulfilled,
                (state, action: PayloadAction<IProjectDTO>) => {
                    // Remove from the list
                    state.projects = (state.projects || []).filter(
                        (p) => p._id !== action.payload._id
                    );

                    state.status.delete.loading = null;
                    state.status.delete.success =
                        'Project deleted successfully!';
                }
            )
            .addCase(deleteProject.rejected, (state, action) => {
                state.status.delete.loading = null;
                state.status.delete.error =
                    action.error.message ?? 'Delete project failed';
            });
    }
});

export const { selectProject, clearProjects, setProjectFetchStatus } =
    projectSlice.actions;
export default projectSlice.reducer;
