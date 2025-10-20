import { ProjectStatus } from "./status";

export interface IMilestoneDTO {
    _id?: string;
    projectId: string;
    name: string;
    description: string;
    dueDate: string;
    status: ProjectStatus;
    assignedTo: string[];
    createdBy: string;
}
