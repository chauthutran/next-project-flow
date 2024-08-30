import { JSONObject } from "../definations";


export const cloneJSONObject = ( obj: JSONObject | JSONObject[]) => {
    return JSON.parse(JSON.stringify(obj));
}
