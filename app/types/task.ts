import { ProjectStatus } from "@/models/Project";
import mongoose from "mongoose";

export interface ITaskDTO {
    _id?: string;
    projectId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: ProjectStatus;
    assignedTo: string[];
    createdBy: string;
}
