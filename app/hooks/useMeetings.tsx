import { AppDispatch, RootState } from '@/app/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProjects } from './useProjects';
import {
    addMeeting,
    deleteMeeting,
    fetchMeetingsByProjectId,
    updateMeeting
} from '@/app/redux/meetings/meetingsThunk';
import { IMeetingDTO } from '@/app/types/meeting';
import {
    selectMeeting as selectMeetingAction,
    clearMeetings as clearMeetingsAction,
} from '@/app/redux/meetings/meetingSlides';

export function useMeetings() {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedProject } = useProjects();

    const { meetings, selectedMeeting, status } = useSelector(
        (state: RootState) => state.meetings
    );

    useEffect(() => {
        if (selectedProject?._id && !meetings) {
            dispatch(fetchMeetingsByProjectId(selectedProject._id));
        }
    }, [dispatch, selectedProject, meetings]);

    const handleAddMeeting = async (payload: IMeetingDTO) => {
        return await dispatch(addMeeting(payload));
    };

    const handleUpdateMeeting = async (payload: IMeetingDTO) => {
        return await dispatch(updateMeeting(payload));
    };

    const handleDeleteMeeting = async (id: string) => {
        return await dispatch(deleteMeeting(id));
    };
    
    const handleSelectMeeting = (meeting: IMeetingDTO | null) => {
        dispatch(selectMeetingAction(meeting));
    };
        const handleClearMeetings = () => {
            dispatch(clearMeetingsAction());
        };

    return {
        meetings,
        selectedMeeting,
        status,
        selectMeeting: handleSelectMeeting,
        clearMeetings: handleClearMeetings,
        addMeeting: handleAddMeeting,
        updateMeeting: handleUpdateMeeting,
        deleteMeeting: handleDeleteMeeting
    };
}
