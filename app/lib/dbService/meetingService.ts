"use server";

import mongoose from "mongoose";
import { JSONObject } from "../definations";
import connectToDatabase from "./db";
import Metting from "../schemas/Meeting.schema";
import * as Utils from "@/lib/utils";

export async function fetchMeetingsByProjectIdList(
	projectIds: string[]
): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const projectObjIds = projectIds.map(
			(id) => new mongoose.Types.ObjectId(id)
		);
		const meetings = await Metting.find({ projectId: { $in: projectObjIds } });

		return { status: "success", data: Utils.cloneJSONObject(meetings) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}
