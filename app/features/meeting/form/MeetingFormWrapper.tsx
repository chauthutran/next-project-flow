import useAuth from '@/app/hooks/useAuth';
import MeetingForm from './MeetingForm';
import { IMeetingDTO } from '@/app/types/meeting';
import withFormHandler from '@/app/hoc/formHandler/withFormHandler';
import { useMeetings } from '@/app/hooks/useMeetings';
import { meetingSchema } from './meetingSchema';
import { FormikHelpers } from 'formik';

export interface IMeetingFormDataProps extends IMeetingDTO {
    submitType?: 'save' | 'save_continue';
}

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
    
    const {
        selectedMeeting,
        addMeeting,
        updateMeeting,
        selectMeeting,
        status
    } = useMeetings();

    const loading = selectedMeeting
        ? !!status.update.loading
        : !!status.add.loading;

    const MeetingFormBasic = withFormHandler<
        IMeetingFormDataProps,
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
            createdBy: user!._id!,
            submitType: 'save'
        },
        validationSchema: meetingSchema,
        getLoading: () => !!loading,
        onSubmit: async (
            values,
            { resetForm }: FormikHelpers<IMeetingFormDataProps>
        ) => {
            if (selectedMeeting) {
                const payload = {
                    ...values,
                    _id: selectedMeeting._id
                };
                await updateMeeting(payload);
            } else {
                await addMeeting(values);
            }

            if (values.submitType === 'save_continue') {
                selectMeeting(null);
                resetForm();
            }
            afterSubmit();
        }
    });

    return <MeetingFormBasic onClose={onClose} />;
}
