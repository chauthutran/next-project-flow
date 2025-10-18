import { JSONObject } from "@/lib/definations";
import useAuth from "@/hooks/useAuth";
import MeetingForm from "./MeetingForm";
import { IMeetingDTO } from "@/types/meeting";
import withFormHandler from "@/hoc/withFormHandler";
import { useMeetings } from "@/hooks/useMeetings";
import { meetingSchema } from "./meetingSchema";


export default function MeetingFormWrapper({ projectId, data = null, afterSubmit = () => {} }: {projectId: string, data?: JSONObject | null, afterSubmit: () => void}) {

    const { user } = useAuth();
    const { selectedMeeting, addMeeting } = useMeetings();

    const MeetingFormBasic = withFormHandler<IMeetingDTO>(MeetingForm, {
           initialValues: { 
               projectId: projectId,
               name: selectedMeeting?.name || '',
               description: selectedMeeting?.description || '',
               date: selectedMeeting?.date || '',
               participants: selectedMeeting?.assignedTo || [],
               meetingNotes: selectedMeeting?.meetingNotes || "",
               assignedTo: selectedMeeting?.assignedTo || [],
               createdBy: user!._id!,
           },
           validationSchema: meetingSchema,
           onSubmit: async (values) => {
               await addMeeting(values);
               afterSubmit();
           }
       });

    return (
       <MeetingFormBasic />
    );
}