import { JSONObject } from "./definations";

let _project: JSONObject | null = null;
export const setProject = (project: JSONObject | null) => {
    _project = project;
}

export const getProject = (): JSONObject | null => {
    return _project;
}