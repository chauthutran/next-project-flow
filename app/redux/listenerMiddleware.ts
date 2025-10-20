import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
    clearProjects,
    selectProject,
    setProjectFetchStatus
} from './projects/projectSlide';
import { clearTasks } from './tasks/taskSlides';
import { fetchTasksByProjectId } from './tasks/tasksThunk';
import { fetchMeetingsByProjectId } from './meetings/meetingsThunk';
import { fetchMilestonesByProjectId } from './milestones/milestonesThunk';
import { clearMeetings } from './meetings/meetingSlides';
import { clearMilestones } from './milestones/milestoneSlides';

export const listenerMiddleware = createListenerMiddleware();

// Load meetings, tasks, milestones when a project is selected
listenerMiddleware.startListening({
    actionCreator: selectProject,
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(
            setProjectFetchStatus({
                loading: 'Loading related data...',
                success: null
            })
        );

        try {
            const project = action.payload;

            // Clear all task first
            listenerApi.dispatch(clearTasks());

            // If a project is selected, fetch its tasks
            if (project) {
                await Promise.all([
                    listenerApi.dispatch(fetchTasksByProjectId(project._id!)),
                    listenerApi.dispatch(
                        fetchMeetingsByProjectId(project._id!)
                    ),
                    listenerApi.dispatch(
                        fetchMilestonesByProjectId(project._id!)
                    )
                ]);
            }

            listenerApi.dispatch(
                setProjectFetchStatus({
                    loading: null,
                    success: 'Data is loaded!'
                })
            );
        } catch (error) {
            listenerApi.dispatch(
                setProjectFetchStatus({
                    loading: null,
                    error: 'Failed to fetch project or related data.'
                })
            );
        }
    }
});

listenerMiddleware.startListening({
    matcher: isAnyOf(clearProjects),
    effect: async (_, listenerApi) => {
        listenerApi.dispatch(clearTasks());
        listenerApi.dispatch(clearMeetings());
        listenerApi.dispatch(clearMilestones());
    }
});
