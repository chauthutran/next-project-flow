import mongoose from 'mongoose';
import { JSONObject } from '../lib/definations';
import connectToDatabase from '../lib/dbService/db';
import { IProjectDTO } from '@/app/types/project';
import { NotFoundError, ValidationError } from './errors';
import { handleError } from './errorUtils';
import Project, { IProject } from '@/app/models/Project';

export async function fetchProjectsByUserId(
    userId: string
): Promise<IProjectDTO[] | undefined> {
    if (!userId) {
        throw new ValidationError('User ID is required');
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ValidationError('Invalid User ID format');
    }

    try {
        await connectToDatabase();

        const userIdObj = new mongoose.Types.ObjectId(userId);
        const projects = await Project.find({
            managedBy: userIdObj
        }).lean<IProjectDTO[]>();

        // lean() already gives a plain object ==> Don't need to use cloneJSON(projects)
        return projects;
    } catch (error: any) {
        handleError(error);
        return;
    }
}

export async function fetchProjectById(
    projectId: string
): Promise<IProjectDTO | undefined> {
    if (!projectId) {
        throw new ValidationError('Project ID is required');
    }

    try {
        await connectToDatabase();
        const project = await Project.findById(projectId).lean<IProjectDTO>();
        if (!project) throw new NotFoundError('Project not found');

        return project;
    } catch (error: any) {
        handleError(error);
    }
}

export async function addProject(
    payload: IProjectDTO
): Promise<IProject | undefined> {
    if (
        !payload.name ||
        !payload.description ||
        !payload.startDate ||
        !payload.endDate ||
        !payload.status ||
        !payload.managedBy
    ) {
        throw new ValidationError(
            'Fields name, description, startDate, endDate, status, managedBy are required.'
        );
    }

    try {
        await connectToDatabase();

        const project: JSONObject = {
            ...payload,
            startDate: new Date(payload.startDate),
            endDate: new Date(payload.endDate),
            managedBy: new mongoose.Types.ObjectId(payload.managedBy)
        };

        const savedProject = await Project.create(project);
        return savedProject.toObject();
    } catch (error: any) {
        handleError(error);
    }
}

export async function updateProject(
    projectId: string,
    payload: Partial<IProjectDTO>
): Promise<IProject | undefined> {
    if (
        !payload.name ||
        !payload.description ||
        !payload.startDate ||
        !payload.endDate ||
        !payload.status ||
        !payload.managedBy
    ) {
        throw new ValidationError(
            'Fields name, description, startDate, endDate, status, managedBy are required.'
        );
    }

    try {
        await connectToDatabase();

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                $set: {
                    ...payload,
                    startDate: payload.startDate
                        ? new Date(payload.startDate)
                        : undefined,
                    endDate: payload.endDate
                        ? new Date(payload.endDate)
                        : undefined
                }
            },
            { new: true } // return the updated document
        ).lean<IProject>();

        if (!updatedProject) {
            throw new NotFoundError('Project not found');
        }

        return updatedProject;
    } catch (error: any) {
        handleError(error);
    }
}

export async function deleteProject(id: string): Promise<IProject | undefined> {
    if (!id) {
        throw new ValidationError('Project ID is required');
    }

    try {
        await connectToDatabase();

        const deletedProject = await Project.findByIdAndDelete(
            id
        ).lean<IProject>();

        if (!deletedProject) {
            throw new NotFoundError('Project not found');
        }

        return deletedProject; // returns the deleted document or null if not found
    } catch (error) {
        handleError(error);
    }
}
