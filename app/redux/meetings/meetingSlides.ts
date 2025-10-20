import { IMeetingDTO } from '@/types/meeting';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addMeeting,
    fetchMeetingsByProjectId,
    updateMeeting,
    deleteMeeting,
    deleteMeetingsByProjectId
} from './meetingsThunk';

interface MeetingState {
    meetings: IMeetingDTO[] | null;
    loading: boolean;
    error: string | null;
    selectedMeeting: IMeetingDTO | null;
}

const initialState: MeetingState = {
    meetings: null,
    loading: false,
    error: null,
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
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchMeetingsByProjectId.fulfilled,
                (state, action: PayloadAction<IMeetingDTO[]>) => {
                    state.loading = false;
                    state.meetings = action.payload || [];
                }
            )
            .addCase(fetchMeetingsByProjectId.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Fetch meetings failed';
            })
            // Create & Update
            .addCase(addMeeting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                addMeeting.fulfilled,
                (state, action: PayloadAction<IMeetingDTO>) => {
                    state.loading = false;
                    state.selectedMeeting = action.payload;
                    state.meetings!.push(action.payload);
                }
            )
            .addCase(addMeeting.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Add meetings failed';
            })
            // Update
            .addCase(updateMeeting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateMeeting.fulfilled,
                (state, action: PayloadAction<IMeetingDTO>) => {
                    state.selectedMeeting = action.payload;

                    const index = state.meetings!.findIndex(
                        (p) => p._id! === action.payload._id
                    );
                    if (index >= 0) state.meetings![index] = action.payload;
                }
            )
            .addCase(updateMeeting.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Update meeting failed';
            })
            // Delete
            .addCase(deleteMeeting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteMeeting.fulfilled,
                (state, action: PayloadAction<IMeetingDTO>) => {
                    state.meetings = state.meetings!.filter(
                        (p) => p._id !== action.payload._id
                    );
                }
            )
            .addCase(deleteMeeting.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Delete meeting failed';
            })
            // Delete tasks by Project-ID
            .addCase(deleteMeetingsByProjectId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteMeetingsByProjectId.fulfilled,
                (state, action: PayloadAction<IMeetingDTO[]>) => {
                    const deletedIds = action.payload.map((item) => item._id);
                    state.meetings = state.meetings!.filter(
                        (t) => !deletedIds.includes(t._id)
                    );
                }
            )
            .addCase(deleteMeetingsByProjectId.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message ?? 'Delete meetings failed';
            });
    }
});

export const { selectMeeting, clearMeetings } = meetingSlice.actions;
export default meetingSlice.reducer;
