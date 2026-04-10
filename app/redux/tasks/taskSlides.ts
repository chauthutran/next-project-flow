import { ITaskDTO } from '@/app/types/task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addTask,
    fetchTasksByProjectId,
    updateTask,
    deleteTask,
    deleteTasksByProjectId,
} from './tasksThunk';
import { ILoadingState } from '@/app/types/loadingState';

interface TaskState {
    tasks: ITaskDTO[] | null;
    activeTasks: ITaskDTO[] | null;
    completedTasks: ITaskDTO[] | null;
    status: {
        fetch: ILoadingState;
        add: ILoadingState;
        update: ILoadingState;
        delete: ILoadingState;
    };
    selectedTask: ITaskDTO | null;
}

const initialState: TaskState = {
    tasks: null,
    activeTasks: null,
    completedTasks: null,
    status: {
        fetch: {},
        add: {},
        update: {},
        delete: {}
    },
    selectedTask: null
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        selectTask: (state, action: PayloadAction<ITaskDTO | null>) => {
            state.selectedTask = action.payload;
        },
        clearTasks: (state) => {
            state.tasks = null;
            state.selectedTask = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // // Fetch active tasks by userId
            // .addCase(fetchTasksByStatusesAndUser.pending, (state) => {
            //     state.status.fetch = {
            //         loading: 'Fetching tasks ...',
            //         success: null,
            //         error: null
            //     };
            // })
            // .addCase(
            //     fetchTasksByStatusesAndUser.fulfilled,
            //     (state, action: PayloadAction<ITaskDTO[]>) => {
            //         state.status.fetch = {
            //             success: 'Tasks fetched successully!'
            //         };

            //         state.activeTasks = action.payload || [];
            //     }
            // )
            // .addCase(fetchTasksByStatusesAndUser.rejected, (state, action) => {
            //     state.status.fetch = {
            //         error: action.payload ?? 'Fetching tasks failed!'
            //     };
            // })
            
            // Fetch
            .addCase(fetchTasksByProjectId.pending, (state) => {
                state.status.fetch = {
                    loading: 'Fetching tasks ...',
                    success: null,
                    error: null
                };
            })
            .addCase(
                fetchTasksByProjectId.fulfilled,
                (state, action: PayloadAction<ITaskDTO[]>) => {
                    state.status.fetch = {
                        success: 'Tasks fetched successully!'
                    };

                    state.tasks = action.payload || [];
                }
            )
            .addCase(fetchTasksByProjectId.rejected, (state, action) => {
                state.status.fetch = {
                    error: action.payload ?? 'Fetching tasks failed!'
                };
            })
            // Create
            .addCase(addTask.pending, (state) => {
                state.status.add = {
                    loading: 'Adding task...',
                    success: null,
                    error: null
                };
            })
            .addCase(
                addTask.fulfilled,
                (state, action: PayloadAction<ITaskDTO>) => {
                    state.selectedTask = action.payload;
                    state.tasks = [...state.tasks!, action.payload];

                    state.status.add = {
                        success: 'Task added successfully!'
                    };
                }
            )
            .addCase(addTask.rejected, (state, action) => {
                state.status.add.loading = null;
                state.status.add = {
                    error: action.payload ?? 'Adding tasks failed!'
                };
            })
            // Update
            .addCase(updateTask.pending, (state) => {
                state.status.update = {
                    loading: 'Updating task ...',
                    error: null,
                    success: null
                };
            })
            .addCase(
                updateTask.fulfilled,
                (state, action: PayloadAction<ITaskDTO>) => {
                    state.selectedTask = action.payload;
                    state.tasks = state.tasks!.map((p) =>
                        p._id === action.payload._id ? action.payload : p
                    );
                    state.status.update = {
                        success: 'Task updated successfully!'
                    };
                }
            )
            .addCase(updateTask.rejected, (state, action) => {
                state.status.update = {
                    error: action.payload ?? 'Updateing task failed!'
                };
            })
            // Delete task by ID
            .addCase(deleteTask.pending, (state) => {
                state.status.delete = {
                    loading: 'Deleting task...',
                    success: null,
                    error: null
                };
            })
            .addCase(
                deleteTask.fulfilled,
                (state, action: PayloadAction<ITaskDTO>) => {
                    const tasks = [...state.tasks!].filter(
                        (p) => p._id !== action.payload._id
                    );
                    
                    state.tasks = tasks;
                    state.status.delete = {
                        success: 'Task deleted successfully!'
                    };
                }
            )
            .addCase(deleteTask.rejected, (state, action) => {
                state.status.delete = {
                    error:
                        action.payload ??
                        action.error.message ??
                        'Deleting task failed!'
                };
            })
            // Delete tasks by Project-ID
            .addCase(deleteTasksByProjectId.pending, (state) => {
                state.status.delete = {
                    loading: 'Deleting tasks...',
                    success: null,
                    error: null
                };
            })
            .addCase(
                deleteTasksByProjectId.fulfilled,
                (state, action: PayloadAction<ITaskDTO[]>) => {
                    const deletedIds = action.payload.map((item) => item._id);
                    state.tasks = (state.tasks || []).filter(
                        (t) => !deletedIds.includes(t._id)
                    );

                    state.status.delete = {
                        success: 'Tasks deleted successfully!'
                    };
                }
            )
            .addCase(deleteTasksByProjectId.rejected, (state, action) => {
                state.status.delete = {
                    error:
                        action.payload ??
                        action.error.message ??
                        'Deleting tasks failed!'
                };
            });
    }
});

export const { selectTask, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
