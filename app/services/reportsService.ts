import { ValidationError } from "yup";
import { ITaskDTO } from "../types/task";
import mongoose from "mongoose";
import Task from "../models/Task";
import { handleError } from "./errorUtils";
import { JSONObject } from "../lib/definations";

export async function fetchTasksByStatusesAndUser(
    userId: string,
    statuses: string[]
): Promise<ITaskDTO[] | undefined> {
    if (!userId) {
        throw new ValidationError('User ID is required');
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ValidationError('Invalid User ID format');
    }

    try {
        const tasks = await Task.aggregate([
            {
                $match: {
                    status: { $in: statuses }
                }
            },
            {
                $lookup: {
                from: 'projects',
                localField: 'projectId',
                foreignField: '_id',
                as: 'project'
                }
            },
            {
                $unwind: '$project'
            },
            {
                $match: {
                $or: [
                        { assignedTo: new mongoose.Types.ObjectId(userId) },
                        { 'project.managedBy': new mongoose.Types.ObjectId(userId) },
                        { 'project.teamMembers': new mongoose.Types.ObjectId(userId) }
                    ]
                }
            }
        ]);
        return tasks;
    } catch (error: any) {
        handleError(error);
        return;
    }
}


export async function fetchWeeklyTasks(
    userId: string,
    startDate?: string | null, //"2026-01-01"
): Promise<JSONObject[] | undefined> {
    if (!userId) {
        throw new ValidationError('User ID is required');
    }
    if(!startDate) {
        throw new ValidationError('Start date is required');
    }
    if(startDate && isNaN(Date.parse(startDate))) {
        throw new ValidationError('Invalid start date format');
    }
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ValidationError('Invalid User ID format');
    }

    try {
        const data = await Task.aggregate([
            {
                $match: {
                    startDate: {
                        $gte: new Date(startDate) // optional range
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $isoWeekYear: "$startDate" },
                        week: { $isoWeek: "$startDate" }
                    },
                    created: { $sum: 1 },
                    completed: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                        }
                    },
                    in_progress: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.week": 1 }
            }
        ]);

        return data;
    } catch (error: any) {
        handleError(error);
        return;
    }
}