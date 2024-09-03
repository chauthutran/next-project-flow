"use server";

import mongoose from "mongoose";
import { JSONObject } from "../definations";
import connectToDatabase from "./db";
import Task from "../schemas/Task.schema";
import * as Utils from "@/lib/utils";

export async function fetchTasksByProjectIdList(
	projectIds: string[]
): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const projectObjIds = projectIds.map(
			(id) => new mongoose.Types.ObjectId(id)
		);
		const tasks = await Task.find({ projectId: { $in: projectObjIds } });

		return { status: "success", data: Utils.cloneJSONObject(tasks) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}


export async function saveTask( payload: JSONObject ): Promise<JSONObject> {
	try {
		await connectToDatabase();

		let task: JSONObject = Utils.cloneJSONObject(payload);
		task.projectId = new mongoose.Types.ObjectId(payload.projectId);
		// task.startDate = Utils.convertToUTCDateObj(payload.startDate);
		// task.endDate = Utils.convertToUTCDateObj(payload.endDate);
		task.assignedTo = payload.assignedTo.map((id: string) => new mongoose.Types.ObjectId(id));
		task.createdBy = new mongoose.Types.ObjectId(payload.createdBy);

		// // Create a new task instance
        // let task = new Task({
        //     projectId: new mongoose.Types.ObjectId(payload.projectId),
        //     name: payload.name,
        //     description: payload.description,
        //     startDate: new Date(payload.startDate),
        //     endDate: new Date(payload.endDate),
        //     status: payload.status,
        //     assignedTo: payload.assignedTo.map((id: string) => new mongoose.Types.ObjectId(id)),
        //     createdBy: new mongoose.Types.ObjectId(payload.createdBy),
        // });
		
        // Save the task to the database
		let newTask;
		if( task._id === undefined ) { // Add new
        	newTask = await Task.create(task);
		}
		else {
			newTask = await Task.findByIdAndUpdate(task._id, task, { new: true, runValidators: true });
		}

		return { status: "success", data: Utils.cloneJSONObject(newTask) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function updateTask(payload: JSONObject): Promise<JSONObject> {
	
	try {
		await connectToDatabase();

		let task: JSONObject = Utils.cloneJSONObject(payload);
		task.projectId = new mongoose.Types.ObjectId(payload.projectId);
		task.startDate = new Date(payload.startDate);
		task.endDate = new Date(payload.endDate);
		task.assignedTo = payload.assignedTo.map((id: string) => new mongoose.Types.ObjectId(id));
		task.createdBy = new mongoose.Types.ObjectId(payload.createdBy);

        // Save the task to the database
		const newTask = await Task.findByIdAndUpdate(task._id, task, { new: true, runValidators: true });

		return { status: "success", data: Utils.cloneJSONObject(newTask) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}