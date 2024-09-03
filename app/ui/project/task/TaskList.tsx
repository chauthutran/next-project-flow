import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constant";
import ProgressBar from "@/ui/basics/ProgressBar";


export default function TaskList({data}: {data: JSONObject[]}) {

    const getProgressData = (task: JSONObject): JSONObject => {
        let result: JSONObject = { name: `${task.name} is ${Utils.getStatusName(task.status)}`, percent: 0 };


        if( task.status === Constant.TASK_STATUS_COMPLETED ) {
            result.percent = 100;
        }
        else if( task.status === Constant.TASK_STATUS_IN_PROGRESS ) {

            const taskDays = Utils.getDaysBetweenDates( task.startDate, task.endDate ); 
            const realDays = Utils.getDaysBetweenDates( new Date(), task.endDate ); 

            result.percent = ( ( taskDays - realDays ) / taskDays ) * 100;
            result.name = ( realDays < 0 ) ? `${task.name} is overdue` : `${task.name} has ${realDays} day(s) left`;
        }

        return result;
    }

    return (
        <>
            {data.map((task:JSONObject, idx: number) => {
                const progressBarData = getProgressData(task);
                
                return ( <div key={`task_${task._id}`}>
                    <div>Start date: <span className="font-semibold">{Utils.formatDateTimeObj(task.startDate)}</span></div>
                    <div>End date: <span className="font-semibold">{Utils.formatDateTimeObj(task.endDate)}</span></div>
                    <ProgressBar name={progressBarData.name} percentage={progressBarData.percent} />
                </div> )
            })}
        </>
    )
}