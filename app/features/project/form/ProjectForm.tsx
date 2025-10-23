import PrimaryButton from '@/components/buttons/PrimaryButton';
import { SimpleForm } from '@/components/form/SimpleForm';
import SimpleFormFieldSet from '@/components/form/SimpleFormFieldSet';
import SimpleFormInput from '@/components/form/SimpleFormInput';
import SimpleFormTextArea from '@/components/form/SimpleFormTextArea';
import SimpleFormSingleSelect from '@/components/form/SimpleFormSingleSelect';
import useAuth from '@/hooks/useAuth';
import SimpleFormMultipleSelect from '@/components/form/SimpleFormMultipleSelect';
import SimpleFormTitle from '@/components/form/SimpleFormTitle';
import AccentButton from '@/components/buttons/AccentButton';
import { useRouter } from 'next/navigation';
import { STATUS_KEYS } from '@/types/status';
import SimpleFormActions from '@/components/form/SimpleFormActions';

interface ProjectFormProps {
    loading: boolean;
}

export default function ProjectForm({ loading }: ProjectFormProps) {
    const { user } = useAuth();
    const navigate = useRouter();

    const teammembers = user?.teamMembers || [];

    return (
        <SimpleForm aria-label="project form">
            <SimpleFormFieldSet>
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
                        label="Start Date"
                        name="startDate"
                        required
                        aria-required="true"
                    />
                    <SimpleFormInput
                        type="date"
                        label="End Date"
                        name="endDate"
                        required
                        aria-required="true"
                    />
                </div>

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

                <SimpleFormInput
                    type="hidden"
                    label=""
                    name="managedBy"
                    required
                    aria-required="true"
                />

                <SimpleFormMultipleSelect
                    label="Team Members"
                    name="teamMembers"
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

                <SimpleFormActions>
                    {' '}
                    <AccentButton
                        type="button"
                        title="Cancel"
                        onClick={() => navigate.push('/pages/projects')}
                    />
                    
                    <PrimaryButton
                        type="submit"
                        title={loading ? 'Saving...' : 'Save Project & Next'}
                        disabled={loading}
                    />
                </SimpleFormActions>
            </SimpleFormFieldSet>
        </SimpleForm>
    );
}
