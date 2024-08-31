"use client";

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProjectTimeline from "./ProjectTimeline";


export default function ProjectDetailsPage({project}: {project: JSONObject}) {

    const [details, setDetails] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    
    const fetchProjects = async () => {
        const response: JSONObject = await dbService.fetchProjectById(project._id);
        if( response.status != "success" ) {
            setErrMessage( response.message );
        }
        else {
            setDetails( response.data );
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="m-2">
            <ProjectTimeline data={details} />
        </div>
    )
}