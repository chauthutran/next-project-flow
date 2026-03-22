import { IBasicDTO } from "./basic";
import { ProjectStatus } from "./status";
import { IUserDTO } from "./user";

export interface IProjectDTO extends IBasicDTO {
    description: string,
    startDate: string,
    endDate: string,
    status: ProjectStatus,
    managedBy: IUserDTO;
    teamMembers: string[],
}
