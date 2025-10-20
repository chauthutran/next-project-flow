import { IMilestoneDTO } from '@/types/milestone';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addMilestone,
    fetchMilestonesByProjectId,
    updateMilestone,
    deleteMilestone,
    deleteMilestonesByProjectId
} from './milestonesThunk';

interface MilestoneState {
    milestones: IMilestoneDTO[] | null;
    loading: boolean;
    error: string | null;
    selectedMilestone: IMilestoneDTO | null;
}

const initialState: MilestoneState = {
    milestones: null,
    loading: false,
    error: null,
    selectedMilestone: null
};

const milestoneSlice = createSlice({
    name: 'milestones',
    initialState,
    reducers: {
        selectMilestone: (
            state,
            action: PayloadAction<IMilestoneDTO | null>
        ) => {
            state.selectedMilestone = action.payload;
        },
        clearMilestones: (state) => {
            state.milestones = null;
            state.selectedMilestone = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchMilestonesByProjectId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchMilestonesByProjectId.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO[]>) => {
                    state.loading = false;
                    state.milestones = action.payload || [];
                }
            )
            .addCase(fetchMilestonesByProjectId.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Fetch milestones failed';
            })
            // Create & Update
            .addCase(addMilestone.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                addMilestone.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO>) => {
                    state.loading = false;
                    state.selectedMilestone = action.payload;
                    state.milestones!.push(action.payload);
                }
            )
            .addCase(addMilestone.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Add milestones failed';
            })
            // Update
            .addCase(updateMilestone.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateMilestone.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO>) => {
                    state.selectedMilestone = action.payload;

                    const index = state.milestones!.findIndex(
                        (p) => p._id! === action.payload._id
                    );
                    if (index >= 0) state.milestones![index] = action.payload;
                }
            )
            .addCase(updateMilestone.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Update milestone failed';
            })
            // Delete
            .addCase(deleteMilestone.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteMilestone.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO>) => {
                    state.milestones = state.milestones!.filter(
                        (p) => p._id !== action.payload._id
                    );
                }
            )
            .addCase(deleteMilestone.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Delete milestone failed';
            })
            // Delete milestone by Project-ID
            .addCase(deleteMilestonesByProjectId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteMilestonesByProjectId.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO[]>) => {
                    const deletedIds = action.payload.map((item) => item._id);
                    state.milestones = state.milestones!.filter(
                        (t) => !deletedIds.includes(t._id)
                    );
                }
            )
            .addCase(deleteMilestonesByProjectId.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Delete milestones failed';
            });
    }
});

export const { selectMilestone, clearMilestones } = milestoneSlice.actions;
export default milestoneSlice.reducer;
