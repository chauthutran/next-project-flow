import mongoose from 'mongoose';
import { JSONObject } from '../lib/definations';
import connectToDatabase from '../lib/dbService/db';
import Meeting, { IMeeting } from '@/models/Meeting';
import { NotFoundError, ValidationError } from './errors';
import { IMeetingDTO } from '@/types/meeting';
import { handleError } from './errorUtils';

export async function fetchMeetingsByProjectIdList(
    projectIds: string[]
): Promise<IMeeting[] | undefined> {
    if (!projectIds || projectIds.length === 0)
        throw new ValidationError('Project IDs are missing.');

    try {
        await connectToDatabase();

        const projectObjIds = projectIds.map(
            (id) => new mongoose.Types.ObjectId(id)
        );
        const meetings = await Meeting.find({
            projectId: { $in: projectObjIds }
        }).lean<IMeeting[]>();

        return meetings;
    } catch (error: any) {
        handleError(error);
    }
}

export async function fetchMeetingsByProjectId(
    projectId: string
): Promise<IMeeting | undefined> {
    if (!projectId) {
        throw new ValidationError('Project ID is missing.');
    }
    try {
        await connectToDatabase();

        const meetings = await Meeting.find({
            projectId: new mongoose.Types.ObjectId(projectId)
        }).lean<IMeeting>();

        return meetings;
    } catch (error: any) {
        handleError(error);
    }
}

export async function getMeetingById(
    id: string
): Promise<IMeeting | undefined> {
    if (!id) {
        throw new ValidationError('ID is missing.');
    }

    try {
        await connectToDatabase();

        const meeting = await Meeting.findById(id).lean<IMeeting>();

        if (meeting === null) throw new NotFoundError('Meeting not found');

        return meeting;
    } catch (error: any) {
        handleError(error);
    }
}

export async function saveMeeting(
    payload: IMeetingDTO
): Promise<IMeeting | undefined> {
    try {
        await connectToDatabase();

        let meeting = {
            ...payload,
            projectId: new mongoose.Types.ObjectId(payload.projectId),
            createdBy: new mongoose.Types.ObjectId(payload.createdBy)
        };

        // Save the meeting to the database
        if (meeting._id === undefined) {
            // Add new
            const newMeeting = await Meeting.create(meeting);
            return newMeeting.toJSON() as IMeeting;
        }

        // Update
        const updatedMeeting = await Meeting.findByIdAndUpdate(
            meeting._id,
            meeting,
            { new: true, runValidators: true }
        );

        if (!updatedMeeting) {
            throw new Error('Task not found');
        }

        return updatedMeeting;
    } catch (error: any) {
        handleError(error);
    }
}

export async function deleteMeeting(id: string): Promise<IMeeting | undefined> {
     if (!id) throw new ValidationError('Meeting ID is missing.');

     try {
        await connectToDatabase();

        // Save the meeting to the database
        const deletedMeeting = await Meeting.findByIdAndDelete(
            id
        ).lean<IMeeting>();

        if (!deletedMeeting) {
            throw new Error('Meeting not found');
        }
        
        return deletedMeeting;
    } catch (error: any) {
        handleError(error);
    }
}

export async function deleteMeetingsByProjectId(
    projectId: string
): Promise<IMeeting[] | undefined> {
    if (!projectId) throw new ValidationError('Project ID is missing.');

    try {
        await connectToDatabase();

        const deletedMeetings = await Meeting.deleteMany({
            projectId
        }).lean<IMeeting[]>();

        if (!deletedMeetings) {
            throw new NotFoundError('Meetings not found');
        }

        return deletedMeetings;
    } catch (error: any) {
        handleError(error);
    }
}
