import mongoose from 'mongoose';
import { JSONObject } from '../lib/definations';
import connectToDatabase from '../lib/dbService/db';
import * as Utils from '@/lib/utils';
import Metting from '@/models/Meeting';

export async function fetchMeetingsByProjectIdList(
    projectIds: string[]
): Promise<JSONObject> {
    try {
        await connectToDatabase();

        const projectObjIds = projectIds.map(
            (id) => new mongoose.Types.ObjectId(id)
        );
        const meetings = await Metting.find({
            projectId: { $in: projectObjIds }
        });

        return { status: 'success', data: Utils.cloneJSONObject(meetings) };
    } catch (error: any) {
        return { status: 'error', message: error.message };
    }
}

export async function fetchMeetingsByProjectId(
    projectId: string
): Promise<JSONObject> {
    try {
        await connectToDatabase();

        const meetings = await Metting.find({
            projectId: new mongoose.Types.ObjectId(projectId)
        });

        return { status: 'success', data: Utils.cloneJSONObject(meetings) };
    } catch (error: any) {
        return { status: 'error', message: error.message };
    }
}

export async function saveMeeting(payload: JSONObject): Promise<JSONObject> {
    try {
        await connectToDatabase();

        let metting: JSONObject = Utils.cloneJSONObject(payload);
        metting.projectId = new mongoose.Types.ObjectId(payload.projectId);
        // metting.assignedTo = payload.assignedTo.map((id: string) => new mongoose.Types.ObjectId(id));
        metting.createdBy = new mongoose.Types.ObjectId(payload.createdBy);

        // Save the metting to the database
        if (metting._id === undefined) {
            // Add new
            const newMetting = await Metting.create(metting);
            return { status: 'success', data: newMetting?.toJSON() };
        }

        // Update
        const updatedMetting = await Metting.findByIdAndUpdate(
            metting._id,
            metting,
            { new: true, runValidators: true }
        );
        if (!updatedMetting) {
            throw new Error('Task not found');
        }
        return { status: 'success', data: updatedMetting.toJSON() };
    } catch (error: any) {
        return { status: 'error', message: error.message };
    }
}

export async function deleteMeeting(id: string): Promise<JSONObject> {
    try {
        await connectToDatabase();

        // Save the metting to the database
        const newMetting = await Metting.findByIdAndDelete(id);

        return { status: 'success' };
    } catch (error: any) {
        return { status: 'error', message: error.message };
    }
}
