export interface IMeetingDTO {
    _id?: string,
    projectId: string,
    name: string,
    description: string,
    date: string,
    participants: string[],
    meetingNotes?: string,
    assignedTo: string[],
    createdBy: string,
}
