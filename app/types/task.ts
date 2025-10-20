import { ProjectStatus } from "./status";

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
