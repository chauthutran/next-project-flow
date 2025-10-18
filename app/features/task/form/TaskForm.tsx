import { JSONObject } from '@/lib/definations';
import { useEffect, useState } from 'react';
import * as Constant from '@/lib/constant';
import * as Utils from '@/lib/utils';
import { FaSpinner } from 'react-icons/fa';
import { useProjects } from '@/hooks/useProjects';
import useAuth from '@/hooks/useAuth';
import SimpleFormTitle from '@/components/form/SimpleFormTitle';
import { SimpleForm } from '@/components/form/SimpleForm';
import SimpleFormInput from '@/components/form/SimpleFormInput';
import SimpleFormFieldSet from '@/components/form/SimpleFormFieldSet';
import SimpleFormTextArea from '@/components/form/SimpleFormTextArea';
import SimpleFormSingleSelect from '@/components/form/SimpleFormSingleSelect';
import { STATUSES } from '@/models/Project';
import SimpleFormMultipleSelect from '@/components/form/SimpleFormMultipleSelect';
import AccentButton from '@/components/buttons/AccentButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { useRouter } from 'next/navigation';

interface Props {
    loading?: boolean;
}

export default function TaskForm({ loading = false }: Props) {
    const { user } = useAuth();
    const navigate = useRouter();

    const teammembers = user?.teamMembers || [];

    return (
        <>
            <SimpleFormTitle title="Task Details" />
            <SimpleForm aria-label="task form">
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
                        options={STATUSES.map((name) => ({
                            label: name,
                            value: name
                        }))}
                        required
                        aria-required="true"
                    />

                    <SimpleFormMultipleSelect
                        label="assigned To"
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
                        name="projectId"
                        required
                        aria-required="true"
                    />
                </SimpleFormFieldSet>

                <div className="flex justify-end gap-3 pt-4 whitespace-nowrap">
                    <AccentButton
                        type="button"
                        title="Cancel"
                        onClick={() => navigate.push('/pages/projects')}
                    />

                    <PrimaryButton
                        type="submit"
                        title={loading ? 'Saving...' : 'Save Project'}
                        disabled={loading}
                    />
                </div>
            </SimpleForm>
        </>
    );
}
