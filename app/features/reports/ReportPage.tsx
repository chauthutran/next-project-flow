import useAuth from "@/app/hooks/useAuth";
import { useProjects } from "@/app/hooks/useProjects";
import { JSONObject } from "@/app/lib/definations";import { useEffect, useState } from "react";
import UserProjectsTimeline from "../dashboard/components/UserProjectsTimeline";
import { getMeetingsByProjectIds, getMileStonesByProjectIds, getTasksByProjectIds } from "@/app/services/reportServices";
import PageTitle from "@/app/components/PageTitle";
import { FaTimeline } from "react-icons/fa6";

export default function ReportPage() {
    const { projects } = useProjects();
    const [details, setDetails] = useState<JSONObject | null>(null);
    
    useEffect(() => {
        if(projects) {
            fetchProjectDetails();
        }
    },[projects]);
    
    const fetchProjectDetails = async () => {
        const projectIds = (projects || []).map((item: JSONObject) => item._id);

        const taskResponse = await getTasksByProjectIds(projectIds);
        const meetingResponse = await getMeetingsByProjectIds(projectIds);
        const milestoneResponse = await getMileStonesByProjectIds(projectIds);

        setDetails({ projects, tasks: taskResponse, meetings: meetingResponse, milestones: milestoneResponse });
    }
    
    if( !projects || !details ) return <div>Loading ...</div>;
    
    return(
        <>
            <PageTitle
            title="Reports"
            subtitle="View insights into your projects with detailed reports on task progress, completion status, and team performance over time."
            icon={<FaTimeline />}
        />
            
            <UserProjectsTimeline projects={projects} details={details} />
        </>
    )
}