import { JSONObject } from "./definations";
import * as Utils from "@/lib/utils";

let _project: JSONObject | null = null;
let _task: JSONObject | null = null;

export const setProject = (project: JSONObject | null) => {
	_project = project;
};

export const getProject = (): JSONObject | null => {
	return _project;
};

export const setTask = (task: JSONObject | null) => {
	// if (task != null) {
	// 	const temp = Utils.cloneJSONObject(task);
	// 	temp.startDate = new Date(temp.startDate);
	// 	temp.endDate = new Date(temp.endDate);
	// 	_task = temp;
	// } else {
	// 	_task = task;
	// }

    _task = task;
};

export const getTask = (): JSONObject | null => {
	return _task;
};
