import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProjects } from './useProjects';
import {
    addMeeting,
    deleteMeeting,
    fetchMeetingsByProjectId,
    updateMeeting
} from '@/redux/meetings/meetingsThunk';
import { IMeetingDTO } from '@/types/meeting';

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

    return {
        meetings,
        selectedMeeting,
        status,
        addMeeting: handleAddMeeting,
        updateMeeting: handleUpdateMeeting,
        deleteMeeting: handleDeleteMeeting
    };
}
