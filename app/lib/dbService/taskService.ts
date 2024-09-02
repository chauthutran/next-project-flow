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
