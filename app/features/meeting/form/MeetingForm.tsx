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

interface Props {
    loading: boolean;
    onClose: () => void;
    handleReset: () => void;
}

export default function MeetingForm({ loading, onClose, handleReset }: Props) {
    const { user } = useAuth();

    const teammembers = user?.teamMembers || [];

    return (
        <SimpleForm aria-label="meeting form">
            <SimpleFormFieldSet>
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

                <SimpleFormTextArea
                    label="Meeting Notes"
                    name="meetingNotes"
                    required
                    aria-required="true"
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

                <SimpleFormInput
                    type="hidden"
                    label=""
                    name="createdBy"
                    required
                    aria-required="true"
                />
            </SimpleFormFieldSet>

            <SimpleFormActions>
                <AccentButton type="button" title="Cancel" onClick={onClose} />

                <AccentButton
                    type="button"
                    title="Reset"
                    onClick={handleReset}
                />

                <PrimaryButton
                    type="submit"
                    title={loading ? 'Saving...' : 'Save Milestone'}
                    disabled={loading}
                />
            </SimpleFormActions>
        </SimpleForm>
    );
}
