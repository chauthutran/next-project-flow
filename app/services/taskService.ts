import mongoose from 'mongoose';
import connectToDatabase from '../lib/dbService/db';
import Task, { ITask } from '@/models/Task';
import { ITaskDTO } from '@/types/task';
import { NotFoundError, ValidationError } from './errors';
import { handleError } from './errorUtils';

export async function fetchTasksByProjectIdList(
    projectIds: string[]
): Promise<ITask[] | undefined> {
    if (!projectIds || projectIds.length === 0)
        throw new ValidationError('Project IDs are missing.');

    try {
        await connectToDatabase();

        const projectObjIds = projectIds.map(
            (id) => new mongoose.Types.ObjectId(id)
        );
        const tasks = await Task.find({
            projectId: { $in: projectObjIds }
        }).lean<ITask[]>();

        return tasks;
    } catch (error: any) {
        handleError(error);
    }
}

export async function fetchTasksByProjectId(
    projectId: string
): Promise<ITask | undefined> {
    if (!projectId) {
        throw new ValidationError('Project ID is missing.');
    }
    
    try {
        await connectToDatabase();

        const tasks = await Task.find({
            projectId: new mongoose.Types.ObjectId(projectId)
        }).lean<ITask>();

        return tasks;
    } catch (error: any) {
        handleError(error);
    }
}

export async function getTaskById(
    id: string
): Promise<ITask | undefined> {
    if (!id) {
        throw new ValidationError('ID is missing.');
    }
    
    try {
        await connectToDatabase();

        const task = await Task.findById(id).lean<ITask>();

        if( task === null) throw new NotFoundError("Task not found");
        
        return task;
    } catch (error: any) {
        handleError(error);
    }
}

export async function saveTask(payload: ITaskDTO): Promise<ITask | undefined> {
    try {
        await connectToDatabase();

        const task = {
            ...payload,
            projectId: new mongoose.Types.ObjectId(payload.projectId),
            createdBy: new mongoose.Types.ObjectId(payload.createdBy)
        };

        // Add new
        if (task._id === undefined) {
            const newTask = await Task.create(task);
            return newTask.toJSON() as ITask;
        }
		
        // Update new
        const updatedTask = await Task.findByIdAndUpdate(task._id, task, {
            new: true,
            runValidators: true
        }).lean<ITask>();

        if (!updatedTask) {
            throw new Error('Task not found');
        }
        return updatedTask;
    } catch (error: any) {
        handleError(error);
    }
}

export async function deleteTask(id: string): Promise<ITask | undefined> {
    if (!id) throw new ValidationError('Task ID is missing.');

    try {
        await connectToDatabase();

        const deletedTask = await Task.findByIdAndDelete(id).lean<ITask>();

        if (!deletedTask) {
            throw new NotFoundError('Task not found');
        }

        return deletedTask;
    } catch (error: any) {
        handleError(error);
    }
}
