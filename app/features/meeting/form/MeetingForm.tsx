import useAuth from '@/app/hooks/useAuth';
import { SimpleForm } from '@/app/components/form/SimpleForm';
import SimpleFormInput from '@/app/components/form/SimpleFormInput';
import SimpleFormFieldSet from '@/app/components/form/SimpleFormFieldSet';
import SimpleFormTextArea from '@/app/components/form/SimpleFormTextArea';
import SimpleFormMultipleSelect from '@/app/components/form/SimpleFormMultipleSelect';
import AccentButton from '@/app/components/buttons/AccentButton';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import SimpleFormActions from '@/app/components/form/SimpleFormActions';
import { useFormikContext } from 'formik';
import { IMeetingFormDataProps } from './MeetingFormWrapper';

interface Props {
    loading: boolean;
    onClose: () => void;
    handleReset: () => void;
}

export default function MeetingForm({ loading, onClose, handleReset }: Props) {
    const { user } = useAuth();

    const teammembers = user?.teamMembers || [];
    const { setFieldValue } = useFormikContext<IMeetingFormDataProps>();

    return (
        <SimpleForm aria-label="meeting form">
            <SimpleFormFieldSet disabled={loading}>
                <SimpleFormInput
                    type="hidden"
                    label=""
                    name="projectId"
                    required
                    aria-required="true"
                />

                <SimpleFormInput
                    label="Name"
                    name="name"
                    required
                    aria-required="true"
                />

                <SimpleFormTextArea
                    label="Description"
                    name="description"
                    required
                    aria-required="true"
                />

                <SimpleFormInput
                    type="date"
                    label="date"
                    name="date"
                    required
                    aria-required="true"
                />

                <SimpleFormMultipleSelect
                    label="Participants"
                    name="participants"
                    options={
                        teammembers.map((member) => ({
                            label: member.email,
                            value: member.email
                        })) || []
                    }
                    required
                    aria-required="true"
                    helpText="Hold Ctrl/Cmd to select multiple members"
                />

                <SimpleFormMultipleSelect
                    label="Assigned To"
                    name="assignedTo"
                    options={
                        teammembers.map((member) => ({
                            label: member.email,
                            value: member.email
                        })) || []
                    }
                    required
                    aria-required="true"
                    helpText="Hold Ctrl/Cmd to select multiple members"
                />

                <SimpleFormTextArea label="Meeting Notes" name="meetingNotes" />

                <SimpleFormInput
                    type="hidden"
                    label=""
                    name="createdBy"
                    required
                    aria-required="true"
                />

                {/* hidden field is optional if you set via setFieldValue */}
                <SimpleFormInput
                    type="hidden"
                    label=""
                    name="submitType"
                    required
                    aria-required="true"
                />
            </SimpleFormFieldSet>

            <SimpleFormActions className="flex justify-between items-center w-full">
                {/* Left side buttons */}
                <div className="flex gap-2">
                    <AccentButton
                        type="button"
                        title="Close"
                        onClick={onClose}
                    />

                    <AccentButton
                        type="button"
                        title="Reset"
                        onClick={handleReset}
                    />
                </div>
                {/* Right side buttons */}
                <div className="flex gap-2">
                    <PrimaryButton
                        type="submit"
                        title={loading ? 'Saving...' : 'Save Task & Continue'}
                        onClick={() =>
                            setFieldValue('submitType', 'save_continue')
                        }
                        disabled={loading}
                    />

                    <PrimaryButton
                        type="submit"
                        title={loading ? 'Saving...' : 'Save'}
                        onClick={() => setFieldValue('submitType', 'save')}
                        disabled={loading}
                    />
                </div>
            </SimpleFormActions>
        </SimpleForm>
    );
}
