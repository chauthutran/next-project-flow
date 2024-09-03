"use client";

import { JSONObject } from '@/lib/definations';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as dbService from "@/lib/dbService";
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constant";


interface ProjectContextProps {
	projectDetails: JSONObject | null;
	saveTask: (task: JSONObject) => Promise<void>;
	error: string | null;
	processStatus: string;
}

const ProjectContext = createContext<ProjectContextProps>({
	projectDetails: null,
	saveTask: async() => { },
	error: null,
	processStatus: ""
});

export const useProject = (): ProjectContextProps => {
	const context = useContext(ProjectContext);

	if (!context) {
	  throw new Error('useProject must be used within an ProjectProvider');
	}
	return context;
};

export const ProjectProvider = ({ projectId, children }: { projectId: string, children: ReactNode }) => {
	const [projectDetails, setProjectDetails] = useState<JSONObject | null>(null);
	const [processStatus, setProcessStatus] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	
	const fetchProgramDetails = async (programId: string) => {
		setProcessStatus(Constant.TASK_FETCH_REQUEST);
		setError(null);

		const response: JSONObject = await dbService.fetchProjectById(programId);
        if (response.status != "success") {
            setError(response.message);
			setProcessStatus(Constant.TASK_FETCH_FAILURE);
        }
        else {
            setProjectDetails(response.data);
			setProcessStatus(Constant.TASK_FETCH_SUCCESS);
        }
	};

    useEffect(() => {
        fetchProgramDetails(projectId);
    }, []);

	const saveTask = async(task: JSONObject) => {
		setProcessStatus(Constant.TASK_SAVE_REQUEST);
		setError(null);
		
		let newTask = convertTaskDatesToUTC(task);

		let response: JSONObject = await dbService.saveTask(newTask);
        if (response.status !== "success") {
            setError(response.message);
			setProcessStatus(Constant.TASK_SAVE_FAILURE);
        }
        else {
            // Need to update the new task of project details data
			const temp = Utils.cloneJSONObject(projectDetails!);
			if( temp.tasks == undefined ) temp.tasks = [];

			const savedTask = response.data;
			var found = Utils.findItemFromList(temp.tasks, savedTask._id, "_id");
			if( found ) {
				Utils.findAndReplaceItemFromList(temp.tasks, savedTask._id, "_id", savedTask);
			}
			else {
				temp.tasks.push( savedTask );
			}
			
			setProjectDetails(temp);
			setProcessStatus(Constant.TASK_SAVE_SUCCESS);
        }
	}

	const convertTaskDatesToUTC = (task: JSONObject) => {
		let newTask = Utils.cloneJSONObject(task);
        newTask.startDate = Utils.convertToUTCDateObj(newTask.startDate);
        newTask.endDate = Utils.convertToUTCDateObj(newTask.endDate);

		return newTask;
	}

	return (
		<ProjectContext.Provider value={{ projectDetails, processStatus, error, saveTask }}>
			{children}
		</ProjectContext.Provider>
	);
};
