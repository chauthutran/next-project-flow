import useAuth from "@/app/hooks/useAuth";
import { useProjects } from "@/app/hooks/useProjects";
import { JSONObject } from "@/app/lib/definations";
import { getMeetingsByProjectIds, getMileStonesByProjectIds, getTasksByProjectIds } from "@/app/services/reportServices";
import { useEffect, useState } from "react";
import { Calendar } from "nextjs-jc-component-libs/dist/components";
import { EventType } from "nextjs-jc-component-libs/dist/libs/definations";
import { convertDateStrToObj, getMeetingColor, getMilestoneColor, getTaskColor } from "@/app/lib/utils";
import PageTitle from "../../components/PageTitle";
import { AiFillCalendar } from "react-icons/ai";
import DayEventList from "./DayEventList";
import Dialog from "../../components/dialog/Dialog";
import SecondButton from "../../components/buttons/SecondButton";
import { FaThList } from "react-icons/fa";
import UserProjectsTimeline from "@/app/features/dashboard/components/UserProjectsTimeline";

export type CustomEventType = EventType & {
  description?: string;
};

export default function ProjectCalendar() {
    const { projects } = useProjects();
    const [details, setDetails] = useState<JSONObject | null>(null);
    const [eventDetails, setEventDetails] = useState<JSONObject | null>(null);
    const [showCalendar, setShowCalendar] = useState(true);
    
    const fetchProjectListDetails = async () => {
        const projectIds = projects!.map((item: JSONObject) => item._id);

        const tasks = await getTasksByProjectIds(projectIds);
        const meetings = await getMeetingsByProjectIds(projectIds);
        const milestones = await getMileStonesByProjectIds(projectIds);

        setDetails({ tasks, meetings, milestones });
    }
    
    useEffect(() => {
        if(projects && projects.length > 0) {
            fetchProjectListDetails();
        }
    }, [projects]);

    if(!projects || !details) return <div>Loading ...</div>;
    
    
    const getCalendarEvents = (): EventType[] => {
        let events: EventType[] = [];

        let tasks = details.tasks && details.tasks.map((item: JSONObject) => {
            return {
                title: item.name,
                start: convertDateStrToObj(item.startDate),
                end: convertDateStrToObj(item.endDate),
                color: getTaskColor(),
                description: item.description
            } as EventType
        });
        if(!tasks) tasks = [];
        
        let milestones = details.milestones && details.milestones.map((item: JSONObject) => {
            return {
                title: item.name,
                start: convertDateStrToObj(item.dueDate),
                end: convertDateStrToObj(item.dueDate),
                color: getMilestoneColor(),
                description: item.description
            } as EventType
        });
        if(!milestones) milestones = [];

        
        let meetings = details.meetings && details.meetings.map((item: JSONObject) => {
            return {
                title: item.name,
                start: convertDateStrToObj(item.date),
                end: convertDateStrToObj(item.date),
                color: getMeetingColor(),
                description: item.description
            } as EventType
        });
        if(!meetings) meetings = [];

        return events.concat(tasks, milestones, meetings);
    }
    
    const getHeaderInfo = () => {
        return showCalendar ? {
            icon: <AiFillCalendar />,
            title: "Calendar",
            description: "The Calendar provides a visual timeline of tasks, deadlines, and events across projects. It helps users plan, track, and manage schedules efficiently by displaying all time-based activities in daily, weekly, or monthly views."
        } : {
            icon: <FaThList />,
            title: "Event List",
            description: "The Event List gives you a quick overview of all upcoming tasks, milestones, and meetings across your projects. It helps you stay organized and prioritize your work by showing all time-sensitive activities in a concise list format."
        }
        
    }
    
    const headerInfo = getHeaderInfo();
    
    return (
        <div className="flex-1 overflow-y-auto bg-[var(--bg)] px-6 py-3 space-y-6">
            <PageTitle
                title={headerInfo.title}
                subtitle={headerInfo.description}
                icon={headerInfo.icon}
                action={
                    showCalendar ? (
                        <SecondButton
                            type="button"
                            title="Show Event List"
                            onClick={() => setShowCalendar(false)}
                        />
                    ) : (
                        <SecondButton
                            type="button"
                            title="Show Calendar"
                            onClick={() => setShowCalendar(true)}
                        />
                    )
                }
            />

            {showCalendar && (
                <Calendar events={getCalendarEvents()} onClick={(data: JSONObject)=> setEventDetails(data)} initMonth={9} initYear={2024} />
            )}
            
            {!showCalendar && (
                 <UserProjectsTimeline projects={projects} details={details} />
            )}
            
            {eventDetails && (
                 <Dialog open={!!eventDetails} onClose={() => setEventDetails(null)} onConfirm={() => {}}>
                    {/* Body */}
                    <Dialog.Body>
                        <DayEventList data={eventDetails} />
                    </Dialog.Body>
        
                    {/* Footer */}
                    <Dialog.Actions>
                        <Dialog.CloseButton>Cancel</Dialog.CloseButton>
                    </Dialog.Actions>
                </Dialog>
            )}
        </div>
    );
}