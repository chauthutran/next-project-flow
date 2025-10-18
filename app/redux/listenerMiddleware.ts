import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { clearProjects, selectProject } from "./projects/projectSlide";
import { clearTasks } from "./tasks/taskSlides";
import { fetchTasksByProjectId } from "./tasks/tasksThunk";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: selectProject,
    effect: async (action, listenerApi) => {
        const project = action.payload;
        
        // Clear all task first
        listenerApi.dispatch(clearTasks());
        
        // If a project is selected, fetch its tasks
        if(project) {
            await listenerApi.dispatch(fetchTasksByProjectId(project._id!))
        }
    }
})

listenerMiddleware.startListening({
    matcher: isAnyOf(clearProjects),
    effect: async(_, listenerApi) => {
       listenerApi.dispatch(clearTasks());
    }
})