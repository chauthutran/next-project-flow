import useAuth from '@/app/hooks/useAuth';
import { SimpleForm } from '@/app/components/form/SimpleForm';
import SimpleFormInput from '@/app/components/form/SimpleFormInput';
import SimpleFormFieldSet from '@/app/components/form/SimpleFormFieldSet';
import SimpleFormTextArea from '@/app/components/form/SimpleFormTextArea';
import SimpleFormSingleSelect from '@/app/components/form/SimpleFormSingleSelect';
import SimpleFormMultipleSelect from '@/app/components/form/SimpleFormMultipleSelect';
import AccentButton from '@/app/components/buttons/AccentButton';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import { STATUS_KEYS } from '@/app/types/status';
import SimpleFormActions from '@/app/components/form/SimpleFormActions';
import { useFormikContext } from 'formik';
import { IMilestoneFormDataProps } from './MilestoneFormWrapper';

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
    const { setFieldValue } = useFormikContext<IMilestoneFormDataProps>();

    const teammembers = user?.teamMembers || [];

    return (
        <>
            <SimpleForm aria-label="milestone form">
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
                                label: member.email,
                                value: member.email
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
                            title={
                                loading ? 'Saving...' : 'Save Task & Continue'
                            }
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
        </>
    );
}
