import useAuth from '@/hooks/useAuth';
import SimpleFormTitle from '@/components/form/SimpleFormTitle';
import { SimpleForm } from '@/components/form/SimpleForm';
import SimpleFormInput from '@/components/form/SimpleFormInput';
import SimpleFormFieldSet from '@/components/form/SimpleFormFieldSet';
import SimpleFormTextArea from '@/components/form/SimpleFormTextArea';
import SimpleFormMultipleSelect from '@/components/form/SimpleFormMultipleSelect';
import AccentButton from '@/components/buttons/AccentButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { useRouter } from 'next/navigation';
import SimpleFormActions from '@/components/form/SimpleFormActions';
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
                            label: member,
                            value: member
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
                        teammembers.map((member: string) => ({
                            label: member,
                            value: member
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
