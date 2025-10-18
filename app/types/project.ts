import { ProjectStatus } from "@/models/Project";
import { IMeetingDTO } from "./meeting";
import { ITaskDTO } from "./task";
import { IMilestoneDTO } from "./milestone";

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

export interface ProjectDetailsDTO {
    project: IProjectDTO,
    meetings?: IMeetingDTO[],
    milestones?: IMilestoneDTO[],
    tasks?: ITaskDTO[],
}