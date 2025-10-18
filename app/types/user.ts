export interface IUserDTO {
    _id?: string;
    email: string,
    password: string,
    role: string,
    teamMembers: string[];
}