import mongoose from 'mongoose';
import { JSONObject } from '../lib/definations';
import connectToDatabase from '../lib/dbService/db';
import * as Utils from '@/lib/utils';
import Milestone, { IMilestone } from '@/models/Milestone';
import { NotFoundError, ValidationError } from './errors';
import { IMilestoneDTO } from '@/types/milestone';
import { handleError } from './errorUtils';

export async function fetchMilestonesByProjectIdList(
    projectIds: string[]
): Promise<IMilestone[] | undefined> {
    if (!projectIds || projectIds.length === 0)
        throw new ValidationError('Project IDs are missing.');

    try {
        await connectToDatabase();

        const projectObjIds = projectIds.map(
            (id) => new mongoose.Types.ObjectId(id)
        );
        const milestones = await Milestone.find({
            projectId: { $in: projectObjIds }
        }).lean<IMilestone[]>();

        return milestones;
    } catch (error: any) {
        handleError(error);
    }
}

export async function fetchMilestonesByProjectId(
    projectId: string
): Promise<IMilestone | undefined> {
    if (!projectId) {
        throw new ValidationError('Project ID is missing.');
    }

    try {
        await connectToDatabase();

        const milestones = await Milestone.find({
            projectId: new mongoose.Types.ObjectId(projectId)
        }).lean<IMilestone>();

        return milestones;
    } catch (error: any) {
        handleError(error);
    }
}

export async function saveMilestone(
    payload: IMilestoneDTO
): Promise<IMilestone | undefined> {
    try {
        await connectToDatabase();

        const milestone = {
            ...payload,
            projectId: new mongoose.Types.ObjectId(payload.projectId),
            createdBy: new mongoose.Types.ObjectId(payload.createdBy)
        };

        // Add new
        if (milestone._id === undefined) {
            const newMilestone = await Milestone.create(milestone);
            return newMilestone.toJSON() as IMilestone;
        }

        // Update new
        const updatedMilestone = await Milestone.findByIdAndUpdate(
            milestone._id,
            milestone,
            {
                new: true,
                runValidators: true
            }
        ).lean<IMilestone>();

        if (!updatedMilestone) {
            throw new Error('Milestone not found');
        }
        return updatedMilestone;
    } catch (error: any) {
        handleError(error);
    }
}

export async function deleteMilestone(
    id: string
): Promise<IMilestone | undefined> {
    if (!id) throw new ValidationError('Milestone ID is missing.');

    try {
        await connectToDatabase();

        const deletedMilestone = await Milestone.findByIdAndDelete(id);

        if (!deletedMilestone) {
            throw new NotFoundError('Milestone not found');
        }

        return deletedMilestone;
    } catch (error: any) {
         handleError(error);
    }
}
