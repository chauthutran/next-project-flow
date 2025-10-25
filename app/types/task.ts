import { IBasicDTO } from "./basic";
import { ProjectStatus } from "./status";

export interface ITaskDTO extends IBasicDTO {
    projectId: string;
    description: string;
    startDate: string;
    endDate: string;
    status: ProjectStatus;
    assignedTo: string[];
    createdBy: string;
}
