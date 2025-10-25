import { AppDispatch, RootState } from '@/app/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProjects } from './useProjects';
import {
    addMilestone,
    deleteMilestone,
    fetchMilestonesByProjectId,
    updateMilestone
} from '@/app/redux/milestones/milestonesThunk';
import { IMilestoneDTO } from '@/app/types/milestone';
import {
    selectMilestone as selectMilestoneAction,
    clearMilestones as clearMilestonesAction,
} from '@/app/redux/milestones/milestoneSlides';

export function useMilestones() {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedProject } = useProjects();

    const { milestones, selectedMilestone, status } = useSelector(
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

    const handleSelectMilestone = (Milestone: IMilestoneDTO | null) => {
        dispatch(selectMilestoneAction(Milestone));
    };

    const handleClearMilestones = () => {
        dispatch(clearMilestonesAction());
    };
    
    return {
        milestones,
        selectedMilestone,
        status,
        selectMilestone: handleSelectMilestone,
        clearMilestones: handleClearMilestones,
        addMilestone: handleAddMilestone,
        updateMilestone: handleUpdateMilestone,
        deleteMilestone: handleDeleteMilestone
    };
}
