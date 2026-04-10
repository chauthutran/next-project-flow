import axios from "axios";
import { IMeeting } from "../models/Meeting";
import { ITask } from "../models/Task";
import { IMilestone } from "../models/Milestone";

export const getMeetingsByProjectIds = async (projectIds: string[]): Promise<IMeeting[]> => {
    try {
        const projectParams = projectIds.join(','); // Convert array to comma-separated string
        const response = await axios.get(
            `/api/reports/meetings?programs=${projectParams}`
        );
        return response.data.data || [];
    } catch (error: any) {
        console.error('Error fetching meetings by project IDs:', error);
        return [];
    }
};

export const getTasksByProjectIds = async (projectIds: string[]): Promise<ITask[]> => {
    try {
        const projectParams = projectIds.join(','); // Convert array to comma-separated string
        const response = await axios.get(
            `/api/reports/tasks?programs=${projectParams}`
        );
        return response.data.data || [];
    } catch (error: any) {
        console.error('Error fetching tasks by project IDs:', error);
        return [];
    }
};

export const getMileStonesByProjectIds = async (projectIds: string[]): Promise<IMilestone[]> => {
    try {
        const projectParams = projectIds.join(','); // Convert array to comma-separated string
        const response = await axios.get(
            `/api/reports/milestones?programs=${projectParams}`
        );
        return response.data.data || [];
    } catch (error: any) {
        console.error('Error fetching milestones by project IDs:', error);
        return [];
    }
};