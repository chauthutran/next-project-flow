import { IMilestoneDTO } from '@/app/types/milestone';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addMilestone,
    fetchMilestonesByProjectId,
    updateMilestone,
    deleteMilestone,
    deleteMilestonesByProjectId
} from './milestonesThunk';
import { ILoadingState } from '@/app/types/loadingState';

interface MilestoneState {
    milestones: IMilestoneDTO[] | null;
    status: {
        fetch: ILoadingState;
        add: ILoadingState;
        update: ILoadingState;
        delete: ILoadingState;
    };
    selectedMilestone: IMilestoneDTO | null;
}

const initialState: MilestoneState = {
    milestones: null,
    status: {
        fetch: {},
        add: {},
        update: {},
        delete: {}
    },
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
                state.status.fetch.loading = 'Fetch milestones ...';
                state.status.fetch.success = null;
                state.status.fetch.error = null;
            })
            .addCase(
                fetchMilestonesByProjectId.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO[]>) => {
                    state.status.fetch.loading = null;
                    state.status.fetch.success =
                        'Fetch milestones successully!';
                    state.milestones = action.payload || [];
                }
            )
            .addCase(fetchMilestonesByProjectId.rejected, (state, action) => {
                state.status.fetch.loading = null;
                state.status.fetch.error =
                    action.error.message ?? 'Fetch milestones failed';
            })
            // Create
            .addCase(addMilestone.pending, (state) => {
                state.status.add.loading = 'Adding milestone ...';
                state.status.add.success = null;
                state.status.add.error = null;
            })
            .addCase(
                addMilestone.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO>) => {
                    state.status.add.loading = null;
                    state.status.add.success = 'Milestone added successully!';
                    state.milestones!.push(action.payload);
                }
            )
            .addCase(addMilestone.rejected, (state, action) => {
                state.status.add.loading = null;
                state.status.add.error =
                    action.error.message ?? 'Add milestones failed';
            })
            // Update
            .addCase(updateMilestone.pending, (state) => {
                state.status.update.loading = 'Updating milestone ...';
                state.status.update.success = null;
                state.status.update.error = null;
            })
            .addCase(
                updateMilestone.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO>) => {
                    state.selectedMilestone = action.payload;

                    const index = state.milestones!.findIndex(
                        (p) => p._id! === action.payload._id
                    );
                    if (index >= 0) state.milestones![index] = action.payload;

                    state.status.update.loading = null;
                    state.status.update.success =
                        'Milestone updated successully!';
                }
            )
            .addCase(updateMilestone.rejected, (state, action) => {
                state.status.update.loading = null;
                state.status.update.error =
                    action.error.message ?? 'Update milestone failed';
            })
            // Delete
            .addCase(deleteMilestone.pending, (state) => {
                state.status.delete.loading = 'Deleting milestone ...';
                state.status.delete.success = null;
                state.status.delete.error = null;
            })
            .addCase(
                deleteMilestone.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO>) => {
                    state.milestones = state.milestones!.filter(
                        (p) => p._id !== action.payload._id
                    );

                    state.status.delete.loading = null;
                    state.status.delete.success =
                        'Milestone deleted successully!';
                }
            )
            .addCase(deleteMilestone.rejected, (state, action) => {
                state.status.delete.loading = null;
                state.status.delete.error =
                    action.error.message ?? 'Delete milestone failed';
            })
            // Delete milestone by Project-ID
            .addCase(deleteMilestonesByProjectId.pending, (state) => {
                state.status.delete.loading = 'Deleting milestones ...';
                state.status.delete.success = null;
                state.status.delete.error = null;
            })
            .addCase(
                deleteMilestonesByProjectId.fulfilled,
                (state, action: PayloadAction<IMilestoneDTO[]>) => {
                    const deletedIds = action.payload.map((item) => item._id);
                    state.milestones = state.milestones!.filter(
                        (t) => !deletedIds.includes(t._id)
                    );

                    state.status.delete.loading = null;
                    state.status.delete.success =
                        'Milestones deleted successully!';
                }
            )
            .addCase(deleteMilestonesByProjectId.rejected, (state, action) => {
                state.status.delete.loading = null;
                state.status.delete.error =
                    action.error.message ?? 'Delete milestones failed';
            });
    }
});

export const { selectMilestone, clearMilestones } = milestoneSlice.actions;
export default milestoneSlice.reducer;
