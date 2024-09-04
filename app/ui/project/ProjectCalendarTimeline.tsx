import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import { getTime } from "date-fns";


export default function ProjectCalendarTimeline({ project, data }: { project: JSONObject, data: JSONObject }) {

    const projectStartDate = new Date(project.startDate);
    const projectEndDate = new Date(project.endDate);
    const projectDuration = projectEndDate.getTime() - projectStartDate.getTime(); // Duration in milliseconds

    const calculatePercentage = (date: Date) => {
        return ((new Date(date).getTime() - projectStartDate.getTime()) / projectDuration) * 100;
    };


    const projectDaysNo = Utils.getDaysBetweenDates(new Date(project.startDate), new Date(project.endDate));

    return (
        <div>
            {/* Project Timeline */}
            <div className="relative w-full mb-4">
                <div className="flex justify-between text-sm text-gray-700">
                    <span>{Utils.formatDateTimeObj(project.startDate)}</span>
                    <span>Project Timeline</span>
                    <span>{Utils.formatDateTimeObj(project.endDate)}</span>
                </div>
                <div className="h-1 bg-gray-300 my-2"></div>
            </div>

            <div className="space-y-4">
                {data.tasks.map((task: JSONObject) => {
                    const startPercent = calculatePercentage(task.startDate);
                    const endPercent = calculatePercentage(task.endDate);
                    const taskDurationPercent = endPercent - startPercent;

                    return (
                        <div key={task._id} className="relative">

                            <div className="mt-2 text-gray-700 text-sm font-semibold">
                                {task.name}
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="w-1/4">{Utils.formatDateTimeObj(task.startDate)}</span>

                                <div
                                    className="relative h-1 bg-blue-500"
                                    style={{
                                        marginLeft: `${startPercent}%`,
                                        width: `${taskDurationPercent}%`,
                                    }}
                                ></div>

                                <span className="flex-1 m-auto w-1/4 text-right ">{Utils.formatDateTimeObj(task.endDate)}</span>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>

    )
}