"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import { JSONObject } from "@/lib/definations";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";
import * as AppStore from "@/lib/appStore";
import { Calendar } from "nextjs-jc-component-libs/dist/components";
import { EventType } from "nextjs-jc-component-libs/dist/libs/definations";
import * as Utils from "@/lib/utils";


export default function Dashboard() {

    const { setMainPage } = useMainUi();

    const { user } = useAuth();
    const [details, setDetails] = useState<JSONObject>({});
    const [errMessage, setErrMessage] = useState("");

    const fetchProjects = async () => {
        const response: JSONObject = await dbService.fetchProjectsByUserId(user!._id);
        if( response.status != "success" ) {
            setErrMessage( response.message );
        }
        else {

            const projects = response.data;

            const projectIds = projects.map((item: JSONObject) => item._id);

            const taskResponse = await dbService.fetchTasksByProjectIdList(projectIds);
            const meetingResponse = await dbService.fetchMeetingsByProjectIdList(projectIds);
            const milestoneResponse = await dbService.fetchMilestonesByProjectIdList(projectIds);

            setDetails({ projects, tasks: taskResponse.data, meetings: meetingResponse.data, milestones: milestoneResponse.data });
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const getCalendarEvents = (): EventType[] => {
        let events: EventType[] = [];

        let tasks = details.tasks && details.tasks.map((item: JSONObject) => {
            return {
                title: item.name,
                start: Utils.convertDateStrToObj(item.startDate),
                end: Utils.convertDateStrToObj(item.endDate),
                color: Utils.getTaskColor()
            } as EventType
        });
        if(!tasks) tasks = [];
        
        let milestones = details.milestones && details.milestones.map((item: JSONObject) => {
            return {
                title: item.name,
                start: Utils.convertDateStrToObj(item.dueDate),
                end: Utils.convertDateStrToObj(item.dueDate),
                color: Utils.getMilestoneColor()
            } as EventType
        });
        if(!milestones) milestones = [];

        
        let meetings = details.meetings && details.meetings.map((item: JSONObject) => {
            return {
                title: item.name,
                start: Utils.convertDateStrToObj(item.date),
                end: Utils.convertDateStrToObj(item.date),
                color: Utils.getMeetingColor()
            } as EventType
        });
        if(!meetings) meetings = [];

        return events.concat(tasks, milestones, meetings);
    }

    const showProjectDetails = (project: JSONObject) => {
        AppStore.setProject(project);
        setMainPage(Constant.PAGE_PROJECT_DETAILS);
    }

    const getTodayEvents = () => {
        const events = getCalendarEvents();
        const today = new Date();
        const todayEvents: EventType[] = events.filter((event: EventType) => event.start.getTime() <= today.getTime() && today.getTime() <= event.end.getTime() );

        return todayEvents;
    }

    // // Event after today in the current week
    // const getCurrentWeekEvents = () => {
    //     const events = getCalendarEvents();

    //     const {startDate, endDate} = Utils.getCurrentWeekDates();
    //     const today = new Date();

    //     const weekEvents: EventType[] = events.filter((event: EventType) => event.start.getTime() <= today.getTime() && today.getTime() <= event.end.getTime() );

    //     return weekEvents;
    // }

    if( errMessage !== "" ) return (<div className="p-3">{errMessage}</div>);

    const todayEvents = getTodayEvents();

    return (
        <div className="px-6 my-8 grid grid-cols-1 gap-y-5 gap-x-5 z-10 lg:grid-cols-2 md:grid-cols-2">
            
            <div className="space-y-4">
                <div className="bg-white rounded-lg p-3 space-y-4">
                    <div className="font-bold">Projects</div>
                    <div>
                        {details.projects && details.projects.map((project: JSONObject, idx: number)=> (
                            <div key={`project-${project._id}`} className="cursor-pointer hover:text-blue-500" onClick={() => showProjectDetails(project)}>{project.name}</div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg p-3 min-w-96 min-h-[520px]">
                    {/* <Calendar events={[]} onClick={({date: Date, events: EventType[]})=> {}} /> */}
                    <Calendar events={getCalendarEvents()} onClick={(data: JSONObject)=> { }} />
                </div>
            </div>

            <div className="space-y-4">
                <div className="row-span-2 items-center justify-center bg-white rounded-lg p-3 space-y-4">
                    <div className="font-bold">Today Tasks</div>
                    {todayEvents === undefined && todayEvents === null ? <div>[No task]</div> :
                        todayEvents.map((event: EventType, idx: number) => (
                            <div key={`today_event_${idx}`} style={{color: event.color}}>{Utils.formatDateTimeObj(event.start)} - {event.title}</div>
                        ))}
                </div>

                <div className="row-span-2 items-center justify-center bg-white rounded-lg p-3 space-y-4">
                    <div className="font-bold">This Week Tasks</div>
                    {todayEvents === undefined && todayEvents === null ? <div>[No task]</div> :
                        todayEvents.map((event: EventType, idx: number) => (
                            <div key={`today_event_${idx}`} style={{color: event.color}}>{Utils.formatDateTimeObj(event.start)} - {event.title}</div>
                        ))}
                </div>
            </div>
        </div>
    )
}