"use client";

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProjectTimeline from "./ProjectTimeline";
import * as Constant from "@/lib/constant";
import { useMainUi } from "@/contexts/MainUiContext";


export default function ProjectDetailsPage({ project }: { project: JSONObject }) {

    const { subPage } = useMainUi();
    const [details, setDetails] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");


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

    return (

        <div className="min-h-screen bg-gray-100">
            {subPage !== "" && <>
                {subPage === Constant.SUB_PAGE_TIMELINE && <ProjectTimeline data={details} />}
            </>}
        </div>
    )
}