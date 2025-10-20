import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProjects } from './useProjects';
import {
    addMilestone,
    deleteMilestone,
    fetchMilestonesByProjectId,
    updateMilestone
} from '@/redux/milestones/milestonesThunk';
import { IMilestoneDTO } from '@/types/milestone';

export function useMilestones() {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedProject } = useProjects();

    const { milestones, selectedMilestone, loading, error } = useSelector(
        (state: RootState) => state.milestones
    );

    useEffect(() => {
        if (selectedProject?._id && !milestones) {
            dispatch(fetchMilestonesByProjectId(selectedProject._id));
        }
    }, [dispatch, selectedProject, milestones]);

    const handleAddMilestone = async (payload: IMilestoneDTO) => {
        return await dispatch(addMilestone(payload));
    };

    const handleUpdateMilestone = async (payload: IMilestoneDTO) => {
        return await dispatch(updateMilestone(payload));
    };

    const handleDeleteMilestone = async (id: string) => {
        return await dispatch(deleteMilestone(id));
    };

    return {
        milestones,
        selectedMilestone,
        loading,
        error,
        addMilestone: handleAddMilestone,
        updateMilestone: handleUpdateMilestone,
        deleteMilestone: handleDeleteMilestone
    };
}
