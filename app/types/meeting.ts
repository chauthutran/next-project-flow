import { IBasicDTO } from "./basic";

export interface IMeetingDTO extends IBasicDTO {
    projectId: string,
    description: string,
    date: string,
    participants: string[],
    meetingNotes?: string,
    assignedTo: string[],
    createdBy: string,
}
