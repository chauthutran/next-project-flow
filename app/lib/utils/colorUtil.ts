import { JSONObject } from "../definations";
import * as Constant from "@/app/lib/constant";

let STATUS_COLORS: JSONObject = {};
STATUS_COLORS[Constant.MILESTONE_STATUS_PENDING] =  "#FFC107";
STATUS_COLORS[Constant.MILESTONE_STATUS_ACHIEVED] =  "#4CAF50";
STATUS_COLORS[Constant.MILESTONE_STATUS_DELAY] =  "#FF9800";
STATUS_COLORS[Constant.TASK_STATUS_NOT_STARTED] =  "#D6D6D6";
STATUS_COLORS[Constant.TASK_STATUS_IN_PROGRESS] =  "#2196F3";
STATUS_COLORS[Constant.TASK_STATUS_COMPLETED] =  "#2E7D32";

export const getStatusColor = ( status: string ) => {
    return STATUS_COLORS[status];
}

export const getTaskColor = (): string => {
    return "#80B3FF";
}

export const getMeetingColor = (): string => {
    return "#c3f0ca";
}

export const getMilestoneColor = (): string => {
    // return "#e91e63";
    return "#ff8ba7";
}

export const getAvatarColor = (email: string) => {
  let hash = 0;

  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  const bg = `hsl(${hue}, 70%, 85%)`;   // light background
  const text = `hsl(${hue}, 70%, 30%)`; // darker same color

  return { bg, text };
}

export const getVarColor = (name: string): string => {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
};