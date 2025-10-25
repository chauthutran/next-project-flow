import { IBasicDTO } from "./basic";
import { ProjectStatus } from "./status";

export interface IProjectDTO extends IBasicDTO {
    description: string,
    startDate: string,
    endDate: string,
    status: ProjectStatus,
    managedBy: string;
    teamMembers: string[],
}
