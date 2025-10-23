import { IMeetingDTO } from '@/types/meeting';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addMeeting,
    fetchMeetingsByProjectId,
    updateMeeting,
    deleteMeeting,
    deleteMeetingsByProjectId
} from './meetingsThunk';
import { ILoadingState } from '@/types/loadingState';

interface MeetingState {
    meetings: IMeetingDTO[] | null;
    status: {
        fetch: ILoadingState;
        add: ILoadingState;
        update: ILoadingState;
        delete: ILoadingState;
    };
    selectedMeeting: IMeetingDTO | null;
}

const initialState: MeetingState = {
    meetings: null,
    status: {
        fetch: {},
        add: {},
        update: {},
        delete: {}
    },
    selectedMeeting: null
};

const meetingSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        selectMeeting: (state, action: PayloadAction<IMeetingDTO | null>) => {
            state.selectedMeeting = action.payload;
        },
        clearMeetings: (state) => {
            state.meetings = null;
            state.selectedMeeting = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchMeetingsByProjectId.pending, (state) => {
                state.status.fetch.loading = 'Fetch meeting ...';
                state.status.fetch.success = null;
                state.status.fetch.error = null;
            })
            .addCase(
                fetchMeetingsByProjectId.fulfilled,
                (state, action: PayloadAction<IMeetingDTO[]>) => {
                    state.status.fetch.loading = null;
                    state.status.fetch.success = 'Fetch meetings successully!';
                    state.meetings = action.payload || [];
                }
            )
            .addCase(fetchMeetingsByProjectId.rejected, (state, action) => {
                state.status.fetch.loading = null;
                state.status.fetch.error =
                    action.error.message ?? 'Fetch meetings failed';
            })
            // Create
            .addCase(addMeeting.pending, (state) => {
                state.status.add.loading = 'Adding meeting ...';
                state.status.add.success = null;
                state.status.add.error = null;
            })
            .addCase(
                addMeeting.fulfilled,
                (state, action: PayloadAction<IMeetingDTO>) => {
                    state.status.add.loading = null;
                    state.status.add.success = 'Meeting added successully!';

                    state.selectedMeeting = action.payload;
                    state.meetings!.push(action.payload);
                }
            )
            .addCase(addMeeting.rejected, (state, action) => {
                state.status.add.loading = null;
                state.status.add.error =
                    action.error.message ?? 'Add meetings failed';
            })
            // Update
            .addCase(updateMeeting.pending, (state) => {
                state.status.update.loading = 'Updating meeting ...';
                state.status.update.success = null;
                state.status.update.error = null;
            })
            .addCase(
                updateMeeting.fulfilled,
                (state, action: PayloadAction<IMeetingDTO>) => {
                    state.selectedMeeting = action.payload;

                    const index = state.meetings!.findIndex(
                        (p) => p._id! === action.payload._id
                    );
                    if (index >= 0) state.meetings![index] = action.payload;

                    state.status.update.loading = null;
                    state.status.update.success = 'Meeting updated successully!';
                }
            )
            .addCase(updateMeeting.rejected, (state, action) => {
                state.status.update.loading = null;
                state.status.update.error =
                    action.error.message ?? 'Update meeting failed';
            })
            // Delete
            .addCase(deleteMeeting.pending, (state) => {
                state.status.delete.loading = 'Deleting meeting ...';
                state.status.delete.success = null;
                state.status.delete.error = null;
            })
            .addCase(
                deleteMeeting.fulfilled,
                (state, action: PayloadAction<IMeetingDTO>) => {
                    state.meetings = state.meetings!.filter(
                        (p) => p._id !== action.payload._id
                    );
                    state.status.delete.loading = null;
                    state.status.delete.success =
                        'Meeting deleted successfully';
                }
            )
            .addCase(deleteMeeting.rejected, (state, action) => {
                state.status.delete.loading = null;
                state.status.delete.error =
                    action.error.message ?? 'Delete meeting failed';
            })
            // Delete meetings by Project-ID
            .addCase(deleteMeetingsByProjectId.pending, (state) => {
                state.status.delete.loading = 'Deleting meetings ...';
                state.status.delete.success = null;
                state.status.delete.error = null;
            })
            .addCase(
                deleteMeetingsByProjectId.fulfilled,
                (state, action: PayloadAction<IMeetingDTO[]>) => {
                    const deletedIds = action.payload.map((item) => item._id);
                    state.meetings = state.meetings!.filter(
                        (t) => !deletedIds.includes(t._id)
                    );
                    state.status.delete.loading = null;
                    state.status.delete.success =
                        'Meetings deleted successfully';
                }
            )
            .addCase(deleteMeetingsByProjectId.rejected, (state, action) => {
                state.status.delete.loading = null;
                state.status.delete.error =
                    action.error.message ?? 'Delete meetings failed';
            });
    }
});

export const { selectMeeting, clearMeetings } = meetingSlice.actions;
export default meetingSlice.reducer;
