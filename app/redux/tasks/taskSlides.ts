import { ITaskDTO } from '@/types/task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTask, fetchTasksByProjectId, updateTask, deleteTask, deleteTasksByProjectId } from './tasksThunk';

interface TaskState {
    tasks: ITaskDTO[] | null;
    loading: boolean;
    error: string | null;
    selectedTask: ITaskDTO | null;
}

const initialState: TaskState = {
    tasks: null,
    loading: false,
    error: null,
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
            // Fetch
            .addCase(fetchTasksByProjectId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTasksByProjectId.fulfilled,
                (state, action: PayloadAction<ITaskDTO[]>) => {
                    state.loading = false;
                    state.tasks = action.payload || [];
                }
            )
            .addCase(fetchTasksByProjectId.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Fetch tasks failed';
            })
            // Create & Update
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                addTask.fulfilled,
                (state, action: PayloadAction<ITaskDTO>) => {
                    state.loading = false;
                    state.selectedTask = action.payload;
                    state.tasks!.push(action.payload);
                }
            )
            .addCase(addTask.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Add tasks failed';
            })
            // Update
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateTask.fulfilled,
                (state, action: PayloadAction<ITaskDTO>) => {
                    state.selectedTask = action.payload;

                    const index = state.tasks!.findIndex(
                        (p) => p._id! === action.payload._id
                    );
                    if (index >= 0) state.tasks![index] = action.payload;
                }
            )
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Update task failed';
            })
            // Delete task by ID
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteTask.fulfilled,
                (state, action: PayloadAction<ITaskDTO>) => {
                    state.tasks = state.tasks!.filter(
                        (p) => p._id !== action.payload._id
                    );
                }
            )
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Delete task failed';
            })
            // Delete tasks by Project-ID
            .addCase(deleteTasksByProjectId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteTasksByProjectId.fulfilled,
                (state, action: PayloadAction<ITaskDTO[]>) => {
                    const deletedIds = action.payload.map((item) => item._id);
                    state.tasks = state.tasks!.filter(
                        (t) => !deletedIds.includes(t._id)
                    );
                }
            )
            .addCase(deleteTasksByProjectId.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Delete tasks failed';
            });
    }
});

export const { selectTask, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
