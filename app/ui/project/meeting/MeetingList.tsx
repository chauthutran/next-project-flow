import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constant";
import ProgressBar from "@/ui/basics/ProgressBar";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "@/ui/basics/Modal";
import { IoIosCloseCircle } from "react-icons/io";
import MeetingForm from "./MeetingForm";
import { useEffect, useState } from "react";
import * as AppStore from "@/lib/appStore";
import { useProject } from "@/contexts/ProjectContext";
import { IoTrash } from "react-icons/io5";


export default function MeetingList({projectId, data}: {projectId: string, data: JSONObject[]}) {

    const [showMeetingForm, setShowMeetingForm] = useState(false);

    const { projectDetails, processStatus, removeMeeting } = useProject();

    useEffect(() => {

    }, [data]);

    useEffect(() => {
        if( processStatus === Constant.TASK_SAVE_SUCCESS ) {
            setShowMeetingForm(false);
        }
    }, [projectDetails, processStatus]);

    const getProgressData = (meeting: JSONObject): JSONObject => {
        let result: JSONObject = { name: `${meeting.name} is ${Utils.getStatusName(meeting.status)}`, percent: 0 };


        if( meeting.status === Constant.TASK_STATUS_COMPLETED ) {
            result.percent = 100;
        }
        else if( meeting.status === Constant.TASK_STATUS_IN_PROGRESS ) {

            const meetingDays = Utils.getDaysBetweenDates( meeting.startDate, meeting.endDate ); 
            const realDays = Utils.getDaysBetweenDates( new Date(), meeting.endDate ); 

            result.percent = ( ( meetingDays - realDays ) / meetingDays ) * 100;
            result.name = ( realDays < 0 ) ? `${meeting.name} is overdue` : `${meeting.name} has ${realDays} day(s) left`;
        }

        return result;
    } 

    const showUpdateMeetingForm = (meeting: JSONObject) => {
        AppStore.setMeeting( meeting );
        setShowMeetingForm( true );
    }

    const deleteMeeting = (meeting: JSONObject) => {
        const ok = confirm(`Are you sure you want to delete the meeting '${meeting.name}'?`);
        if( ok ) {
            removeMeeting(meeting._id);
        }
    }

    const sortedData = (data.length == 0 ) ? [] : data.sort((a, b) => Utils.convertDateStrToObj(a.startDate).getTime() - Utils.convertDateStrToObj(b.startDate).getTime());

    return (
        <>
            <div className="grid grid-cols-1 gap-3">
                {sortedData.map((meeting:JSONObject, idx: number) => {
                    const progressBarData = getProgressData(meeting);
                    
                    return ( <div key={`meeting_${meeting._id}`} className="border border-gray-300 p-3">
                        <div className="flex flex-row space-x-2">
                            <FaEdit className="size-5 text-blue-600 hover:text-sky-blue cursor-pointer" onClick={() => showUpdateMeetingForm(meeting)}/>
                                 {/* Remove Icon */}
                            <IoTrash
                                className="size-5 text-red-600 hover:text-red-800 cursor-pointer" 
                                onClick={() => deleteMeeting(meeting)} 
                            />
                            <div>{Utils.formatDateTime(meeting.startDate)}</div>
                            <div>-</div>
                            <div>{Utils.formatDateTime(meeting.endDate)}</div>
                        </div>
                        <ProgressBar name={progressBarData.name} percentage={progressBarData.percent} />
                    </div> )
                })}
            </div>

            
            {showMeetingForm && <Modal>
                <div className="bg-white rounded-lg">
                    <h2 className="py-3 px-5 text-xl flex bg-blue-navy text-white rounded-t-lg items-center justify-between">
                        <div>Edit Meeting</div>
                        <div className="flex cursor-pointer" onClick={() => setShowMeetingForm(false)}>
                            <IoIosCloseCircle className="size-6" />
                        </div>
                    </h2>

                    <div className="p-5 rounded-md bg-gray-100">
                        <MeetingForm projectId={projectId} data={AppStore.getMeeting()} />
                    </div>
                </div>
            </Modal>}
        </>
    )
}