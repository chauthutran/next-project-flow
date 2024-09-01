"use client";

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProjectTimeline from "./ProjectTimeline";
import { FaCalendarAlt, FaClipboardCheck, FaClock, FaFlag, FaPlus, FaUsers } from "react-icons/fa";


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
        <div className="p-5 flex">
            <div className="w-1/4 bg-white shadow-lg rounded-lg p-5">
                <div className="text-2xl font-bold mb-5">
                    {project.name}
                </div>

                <nav className="space-y-4">                    <a href="#" className="block text-gray-500 hover:text-blue-700">
                        <span className="flex items-center">
                            <FaClock className="mr-2" /> Timeline View
                        </span>
                    </a>
                    <a href="#" className="block font-semibold hover:text-blue-700">
                        <span className="flex items-center">
                            <FaCalendarAlt className="mr-2" /> Calendar View
                        </span>
                    </a>
                    <a href="#" className="block text-gray-500 hover:text-blue-700">
                        <span className="flex items-center">
                            <FaPlus className="mr-2" /> Add New Task
                        </span>
                    </a>
                    <a href="#" className="block text-gray-500 hover:text-blue-700">
                        <span className="flex items-center">
                            <FaUsers className="mr-2" /> Meeting Schedule
                        </span>
                    </a>
                    <a href="#" className="block text-gray-500 hover:text-blue-700">
                        <span className="flex items-center">
                            <FaFlag className="mr-2" /> Milestones
                        </span>
                    </a>
                    <a href="#" className="block text-gray-500 hover:text-blue-700">
                        <span className="flex items-center">
                            <FaClipboardCheck className="mr-2" /> This Week Plans
                        </span>
                    </a>
                </nav>
            </div>

            <div className="w-3/4 bg-white  p-5 ml-5 rounded-lg shadow-lg">
                <div id="content-area">
                    <ProjectTimeline data={details} />
                </div>
            </div>

        </div>
    )
}