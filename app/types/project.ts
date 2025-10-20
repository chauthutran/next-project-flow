import { ProjectStatus } from "./status";

export interface IProjectDTO {
    _id?: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    status: ProjectStatus,
    managedBy: string;
    teamMembers: string[],
}
