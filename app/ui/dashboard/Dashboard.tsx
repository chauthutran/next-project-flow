"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import * as dbService from "@/lib/dbService";
import { JSONObject } from "@/lib/definations";
import * as Constant from "@/lib/constants";
import { useMainUi } from "@/contexts/MainUiContext";
import * as AppStore from "@/lib/appStore";


export default function Dashboard() {

    const { setMainPage } = useMainUi();

    const { user } = useAuth();
    const [projects, setProjects] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const fetchProjects = async () => {
        const response: JSONObject = await dbService.fetchProjectsByUserId(user!._id);
        if( response.status != "success" ) {
            setErrMessage( response.message );
        }
        else {
            setProjects( response.data );
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const showProjectDetails = (project: JSONObject) => {
        AppStore.setProject(project);
        setMainPage(Constant.PAGE_PROJECT_DETAILS);
    }

    if( errMessage !== "" ) return (<div className="p-3">{errMessage}</div>);

    
    return (
        <div className="flex-1 relative px-6 my-8 grid grid-cols-5 gap-y-5 gap-x-5 z-10">
            <div className="col-span-2">
                <div className="text-2xl font-bold transition-transform" style={{letterSpacing: "3px"}}>Welcome, {user!.email.split("@")[0]}</div>
                <div className="text-md">Here is your agendar for today</div>
            </div>
            <div className="col-span-3 items-center justify-center">
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                            id="searchProject"
                            type="text"
                            name="searchProject"
                            // value={email}
                            placeholder="Search"
                            required
                            // onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <IoSearch className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></IoSearch>
                    </div>
            </div>

            <div className="col-span-2 bg-white rounded-lg p-3 space-y-4">
                <div className="font-bold">Projects</div>
                <div>
                    {projects.map((project: JSONObject, idx: number)=> (
                        <div key={`project-${project._id}`} className="cursor-pointer font-medium" onClick={() => showProjectDetails(project)}>{project.name}</div>
                    ))}
                </div>
            </div>

            <div className="col-span-3 items-center justify-center bg-white rounded-lg p-3 space-y-4">
                <div className="font-bold">Today Tasks</div>
            </div>
        </div>
    )
}