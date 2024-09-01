"use client";

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProjectTimeline from "./ProjectTimeline";
import { FaCalendarAlt, FaClipboardCheck, FaClock, FaFlag, FaPlus, FaUsers } from "react-icons/fa";
import { FaMeetup } from "react-icons/fa";
import { LuMilestone } from "react-icons/lu";
import { FaTasks } from 'react-icons/fa';


export default function ProjectDetailsPage({ project }: { project: JSONObject }) {

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
        <div className="p-5 flex bg-white">
            <ProjectTimeline data={details} />
        </div>
    )
}