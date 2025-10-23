import { JSONObject } from '@/lib/definations';
import useAuth from '@/hooks/useAuth';
import MeetingForm from './MeetingForm';
import { IMeetingDTO } from '@/types/meeting';
import withFormHandler from '@/hoc/formHandler/withFormHandler';
import { useMeetings } from '@/hooks/useMeetings';
import { meetingSchema } from './meetingSchema';

export default function MeetingFormWrapper({
    projectId,
    onClose,
    afterSubmit = () => {}
}: {
    projectId: string;
    onClose: () => void;
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedMeeting, addMeeting, updateMeeting, loading } =
        useMeetings();

    const MeetingFormBasic = withFormHandler<
        IMeetingDTO,
        { onClose: () => void }
    >(MeetingForm, {
        initialValues: {
            projectId: projectId,
            name: selectedMeeting?.name || '',
            description: selectedMeeting?.description || '',
            date: selectedMeeting?.date.split('T')[0] || '',
            participants: selectedMeeting?.assignedTo || [],
            meetingNotes: selectedMeeting?.meetingNotes || '',
            assignedTo: selectedMeeting?.assignedTo || [],
            createdBy: user!._id!
        },
        validationSchema: meetingSchema,
        getLoading: () => !!loading,
        onSubmit: async (values) => {
            if (selectedMeeting) {
                const payload = {
                    ...values,
                    _id: selectedMeeting._id
                };
                await updateMeeting(payload);
            } else {
                await addMeeting(values);
            }
            afterSubmit();
        }
    });

    return <MeetingFormBasic onClose={onClose} />;
}
