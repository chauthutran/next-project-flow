import { JSONObject } from "../definations";
import * as Constant from "@/lib/constant";

let STATUS_COLORS: JSONObject = {};
STATUS_COLORS[Constant.MILESTONE_STATUS_PENDING] =  "#FFC107";
STATUS_COLORS[Constant.MILESTONE_STATUS_ACHIEVED] =  "#4CAF50";
STATUS_COLORS[Constant.MILESTONE_STATUS_DEPLAY] =  "#FF9800";
STATUS_COLORS[Constant.TASK_STATUS_NOT_STARTED] =  "#D6D6D6";
STATUS_COLORS[Constant.TASK_STATUS_IN_PROGRESS] =  "#2196F3";
STATUS_COLORS[Constant.TASK_STATUS_COMPLETED] =  "#2E7D32";

export const getStatusColor = ( status: string ) => {
    return STATUS_COLORS[status];
}