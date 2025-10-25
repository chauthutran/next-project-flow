import { IBasicDTO } from "./basic";
import { ProjectStatus } from "./status";

export interface IMilestoneDTO extends IBasicDTO {
    projectId: string;
    description: string;
    dueDate: string;
    status: ProjectStatus;
    assignedTo: string[];
    createdBy: string;
}
