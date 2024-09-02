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


export async function addTask( payload: JSONObject ): Promise<JSONObject> {
	try {
		await connectToDatabase();

		// Create a new task instance
        const task = new Task({
            projectId: new mongoose.Types.ObjectId(payload.projectId),
            name: payload.name,
            description: payload.description,
            startDate: new Date(payload.startDate),
            endDate: new Date(payload.endDate),
            status: payload.status,
            assignedTo: payload.assignedTo.map((id: string) => new mongoose.Types.ObjectId(id)),
            createdBy: new mongoose.Types.ObjectId(payload.createdBy),
        });
		
        // Save the task to the database
        const newTask = await Task.create(task);

		return { status: "success", data: Utils.cloneJSONObject(newTask) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}