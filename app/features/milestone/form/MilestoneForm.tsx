import useAuth from '@/hooks/useAuth';
import SimpleFormTitle from '@/components/form/SimpleFormTitle';
import { SimpleForm } from '@/components/form/SimpleForm';
import SimpleFormInput from '@/components/form/SimpleFormInput';
import SimpleFormFieldSet from '@/components/form/SimpleFormFieldSet';
import SimpleFormTextArea from '@/components/form/SimpleFormTextArea';
import SimpleFormSingleSelect from '@/components/form/SimpleFormSingleSelect';
import SimpleFormMultipleSelect from '@/components/form/SimpleFormMultipleSelect';
import AccentButton from '@/components/buttons/AccentButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { STATUS_KEYS } from '@/types/status';
import SimpleFormActions from '@/components/form/SimpleFormActions';

interface Props {
    onClose: () => void;
    loading: boolean;
    handleReset: () => void;
}

export default function MilestoneForm({
    onClose,
    loading,
    handleReset
}: Props) {
    const { user } = useAuth();

    const teammembers = user?.teamMembers || [];

    return (
        <>
            <SimpleForm aria-label="milestone form">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SimpleFormInput
                            type="date"
                            label="Due Date"
                            name="dueDate"
                            required
                            aria-required="true"
                        />

                        <SimpleFormSingleSelect
                            label="Status"
                            name="status"
                            options={STATUS_KEYS.map((name: string) => ({
                                label: name,
                                value: name
                            }))}
                            required
                            aria-required="true"
                        />
                    </div>

                    <SimpleFormMultipleSelect
                        label="Assigned To"
                        name="assignedTo"
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

                    <SimpleFormInput
                        type="hidden"
                        label=""
                        name="createdBy"
                        required
                        aria-required="true"
                    />
                </SimpleFormFieldSet>

                <SimpleFormActions>
                    <AccentButton
                        type="button"
                        title="Cancel"
                        onClick={onClose}
                    />

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
        </>
    );
}
