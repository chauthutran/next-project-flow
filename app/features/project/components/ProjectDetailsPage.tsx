"use client";

import { JSONObject } from "@/app/lib/definations";
import { useEffect } from "react";
import ProjectTimeline from "./ProjectTimeline";
import * as Constant from "@/app/lib/constant";
import * as AppStore from "@/app/lib/appStore";
import ProjectCalendarTimeline from "./ProjectCalendarTimeline";
import MilestonePage from "../../milestone/MilestonePage";
import TaskPage from "@/app/features/task/TaskPage";
import MeetingPage from "@/app/features/meeting/MeetingPage";
import { useRouter } from "next/navigation";
import { useProjects } from "@/app/hooks/useProjects";


export default function ProjectDetailsPage({ project }: { project: JSONObject }) {

    const { selectedProject } = useProjects();
    const router = useRouter();

    useEffect(() => {
         router.push('/pages/dashboard');
        // router.push(Constant.SUB_PAGE_TIMELINE);
    }, []);

    const projectId = AppStore.getProject()!._id;

    if( selectedProject === null ) return (<div>Loading ...</div>);

    return (
        <div className="relative h-full py-6 px-5 bg-white">
            <ProjectTimeline data={selectedProject} />
            {/* {subPage === Constant.SUB_PAGE_TIMELINE && <ProjectTimeline data={projectDetails} />}
            {/* {subPage === Constant.SUB_PAGE_TIMELINE && <UserProjectsTimeline details={projectDetails} />} */}
            {/* {subPage === Constant.SUB_PAGE_CALENDAR && <ProjectCalendarTimeline project={project} data={projectDetails}/>} 
            {subPage === Constant.SUB_PAGE_NEW_TASK && <TaskPage projectId={projectId} data={projectDetails} />}
            {subPage === Constant.SUB_PAGE_NEW_MEETING && <MeetingPage projectId={projectId} data={projectDetails} />}
            {subPage === Constant.SUB_PAGE_NEW_MILESTONE && <MilestonePage projectId={projectId} data={projectDetails} />} */}
        </div>
    )
}