"use server";

import mongoose from "mongoose";
import { JSONObject } from "../definations";
import connectToDatabase from "./db";
import * as Utils from "@/lib/utils";
import Milestone from "../schemas/Milestone.schema";

export async function fetchMilestonesByProjectIdList(
	projectIds: string[]
): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const projectObjIds = projectIds.map(
			(id) => new mongoose.Types.ObjectId(id)
		);
		const milestones = await Milestone.find({
			projectId: { $in: projectObjIds },
		});

		return { status: "success", data: Utils.cloneJSONObject(milestones) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}
