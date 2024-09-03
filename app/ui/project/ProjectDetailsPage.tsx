"use client";

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProjectTimeline from "./ProjectTimeline";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";
import ProjectCalendar from "./ProjectCalendar";
import * as AppStore from "@/lib/appStore";
import TaskForm from "./task/TaskForm";
import MeetingForm from "./MeetingForm";
import MilestoneForm from "./MilestoneForm";
import TaskPage from "./task/TaskPage";


export default function ProjectDetailsPage({ project }: { project: JSONObject }) {

    const { subPage,setSubPage } = useMainUi();
    const [details, setDetails] = useState<JSONObject>({});
    const [errMessage, setErrMessage] = useState("");

    useEffect(() => {
        setSubPage(Constant.SUB_PAGE_TIMELINE);
    }, [])

    const fetchProjects = async () => {
        const response: JSONObject = await dbService.fetchProjectById(project._id);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setDetails(response.data);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const onAddTaskSuccess = (newTask: JSONObject) => {
        if( details.tasks == undefined ) details.tasks = [];
        details.tasks.push( newTask );
    }

    const projectId = AppStore.getProject()!._id;

    return (
        <div className="relative h-full py-6 px-5 bg-white">
            {subPage === Constant.SUB_PAGE_TIMELINE && <ProjectTimeline data={details} />}
            {subPage === Constant.SUB_PAGE_CALENDAR && <ProjectCalendar />} 
            {subPage === Constant.SUB_PAGE_NEW_TASK && <TaskPage projectId={projectId} data={details} onSuccess={(newTask: JSONObject) => onAddTaskSuccess(newTask) } />}
            {subPage === Constant.SUB_PAGE_NEW_MEETING && <MeetingForm projectId={projectId} />}
            {subPage === Constant.SUB_PAGE_NEW_MILESTONE && <MilestoneForm projectId={projectId} />}
        </div>
    )
}