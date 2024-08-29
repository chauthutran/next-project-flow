import mongoose from 'mongoose';
import Project from '../schemas/Project.schema';
import { JSONObject } from '../definations';
import connectToDatabase from './db';
import Metting from '../schemas/Meeting.schema';
import Milestone from '../schemas/Milestone.schema';
import Task from '../schemas/Task.schema';

export async function fetchProjectsByUserId(userId: string): Promise<JSONObject[]> {

    const userIdObj = new mongoose.Types.ObjectId( userId );
	await connectToDatabase();
    const projects = await Project.find({ managedBy: userIdObj });

    return projects;
}

export async function fetchProjectById(projectId: string): Promise<JSONObject> {

    const projectIdObj = new mongoose.Types.ObjectId( projectId );

	await connectToDatabase();
    const mettings = await Metting.find({ projectId: projectIdObj });
    const milestones = await Milestone.find({ projectId: projectIdObj });
    const tasks = await Task.find({ projectId: projectIdObj });

    return { mettings, milestones, tasks };
}