import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constant";
import ProgressBar from "@/ui/basics/ProgressBar";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "@/ui/basics/Modal";
import { IoIosCloseCircle } from "react-icons/io";
import MilestoneForm from "./MilestoneForm";
import { useEffect, useState } from "react";
import * as AppStore from "@/lib/appStore";
import { useProject } from "@/contexts/ProjectContext";
import { IoTrash } from "react-icons/io5";


export default function MilestoneList({projectId, data}: {projectId: string, data: JSONObject[]}) {

    const [showMilestoneForm, setShowMilestoneForm] = useState(false);

    const { projectDetails, processStatus, removeMilestone } = useProject();

    useEffect(() => {

    }, [data]);

    useEffect(() => {
        if( processStatus === Constant.TASK_SAVE_SUCCESS ) {
            setShowMilestoneForm(false);
        }
    }, [projectDetails, processStatus]);

    const getProgressData = (milestone: JSONObject): JSONObject => {
        let result: JSONObject = { name: `${milestone.name} is ${Utils.getStatusName(milestone.status)}`, percent: 0 };


        if( milestone.status === Constant.TASK_STATUS_COMPLETED ) {
            result.percent = 100;
        }
        else if( milestone.status === Constant.TASK_STATUS_IN_PROGRESS ) {

            const milestoneDays = Utils.getDaysBetweenDates( milestone.startDate, milestone.endDate ); 
            const realDays = Utils.getDaysBetweenDates( new Date(), milestone.endDate ); 

            result.percent = ( ( milestoneDays - realDays ) / milestoneDays ) * 100;
            result.name = ( realDays < 0 ) ? `${milestone.name} is overdue` : `${milestone.name} has ${realDays} day(s) left`;
        }

        return result;
    } 

    const showUpdateMilestoneForm = (milestone: JSONObject) => {
        AppStore.setMilestone( milestone );
        setShowMilestoneForm( true );
    }

    const deleteMilestone = (milestone: JSONObject) => {
        const ok = confirm(`Are you sure you want to delete the milestone '${milestone.name}'?`);
        if( ok ) {
            removeMilestone(milestone._id);
        }
    }

    const sortedData = (data.length == 0 ) ? [] : data.sort((a, b) => Utils.convertDateStrToObj(a.startDate).getTime() - Utils.convertDateStrToObj(b.startDate).getTime());

    return (
        <>
            <div className="grid grid-cols-1 gap-3">
                {sortedData.map((milestone:JSONObject, idx: number) => {
                    const progressBarData = getProgressData(milestone);
                    
                    return ( <div key={`milestone_${milestone._id}`} className="border border-gray-300 p-3">
                        <div className="flex flex-row space-x-2">
                            <FaEdit className="size-5 text-blue-600 hover:text-sky-blue cursor-pointer" onClick={() => showUpdateMilestoneForm(milestone)}/>
                                 {/* Remove Icon */}
                            <IoTrash
                                className="size-5 text-red-600 hover:text-red-800 cursor-pointer" 
                                onClick={() => deleteMilestone(milestone)} 
                            />
                            <div>{Utils.formatDateTime(milestone.startDate)}</div>
                            <div>-</div>
                            <div>{Utils.formatDateTime(milestone.endDate)}</div>
                        </div>
                        <ProgressBar name={progressBarData.name} percentage={progressBarData.percent} />
                    </div> )
                })}
            </div>

            
            {showMilestoneForm && <Modal>
                <div className="bg-white rounded-lg">
                    <h2 className="py-3 px-5 text-xl flex bg-blue-navy text-white rounded-t-lg items-center justify-between">
                        <div>Edit Milestone</div>
                        <div className="flex cursor-pointer" onClick={() => setShowMilestoneForm(false)}>
                            <IoIosCloseCircle className="size-6" />
                        </div>
                    </h2>

                    <div className="p-5 rounded-md bg-gray-100">
                        <MilestoneForm projectId={projectId} data={AppStore.getMilestone()} />
                    </div>
                </div>
            </Modal>}
        </>
    )
}