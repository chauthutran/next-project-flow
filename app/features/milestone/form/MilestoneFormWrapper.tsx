import useAuth from '@/app/hooks/useAuth';
import MilestoneForm from './MilestoneForm';
import { IMilestoneDTO } from '@/app/types/milestone';
import withFormHandler from '@/app/hoc/formHandler/withFormHandler';
import { milestoneSchema } from './milestoneSchema';
import { useMilestones } from '@/app/hooks/useMilestones';
import { FormikHelpers } from 'formik';

export interface IMilestoneFormDataProps extends IMilestoneDTO {
    submitType?: 'save' | 'save_continue';
}

export default function MilestoneFormWrapper({
    projectId,
    onClose,
    afterSubmit = () => {}
}: {
    projectId: string;
    onClose: () => void;
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedMilestone, selectMilestone, addMilestone, updateMilestone, status } =
        useMilestones();

         const loading = selectedMilestone
        ? !!status.update.loading
        : !!status.add.loading;
        
    const MilestoneFormBasic = withFormHandler<
        IMilestoneFormDataProps,
        { onClose: () => void }
    >(MilestoneForm, {
        initialValues: {
            projectId: projectId,
            name: selectedMilestone?.name || '',
            description: selectedMilestone?.description || '',
            dueDate: selectedMilestone?.dueDate.split('T')[0] || '',
            status: selectedMilestone?.status || 'not_started',
            createdBy: user!._id!,
            assignedTo: selectedMilestone?.assignedTo || [],
            submitType: 'save'
        },
        validationSchema: milestoneSchema,
        getLoading: () => !!loading,
        onSubmit: async (values,  { resetForm }: FormikHelpers<IMilestoneFormDataProps>) => {
            if (selectedMilestone) {
                const payload = {
                    ...values,
                    _id: selectedMilestone._id
                };
                await updateMilestone(payload);
            } else {
                await addMilestone(values);
            }

            if (values.submitType === 'save_continue') {
                selectMilestone(null);
                resetForm();
            }
            afterSubmit();
            
        }
    });

    return <MilestoneFormBasic onClose={onClose} />;
}
