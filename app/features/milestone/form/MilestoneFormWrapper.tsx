import useAuth from '@/hooks/useAuth';
import MilestoneForm from './MilestoneForm';
import { IMilestoneDTO } from '@/types/milestone';
import withFormHandler from '@/hoc/withFormHandler';
import { milestoneSchema } from './milestoneSchema';
import { useMilestones } from '@/hooks/useMilestones';

export default function MilestoneFormWrapper({
    projectId,
    afterSubmit = () => {}
}: {
    projectId: string;
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedMilestone, addMilestone, updateMilestone, loading } =
        useMilestones();

    const MilestoneFormBasic = withFormHandler<IMilestoneDTO>(MilestoneForm, {
        initialValues: {
            projectId: projectId,
            name: selectedMilestone?.name || '',
            description: selectedMilestone?.description || '',
            dueDate: selectedMilestone?.dueDate.split('T')[0] || '',
            status: selectedMilestone?.status || 'not_started',
            createdBy: user!._id!,
            assignedTo: selectedMilestone?.assignedTo || []
        },
        validationSchema: milestoneSchema,
        getLoading: () => !!loading,
        onSubmit: async (values) => {
            console.log("=== submit MilestoneFormBasic");
            if (selectedMilestone) {
                const payload = {
                    ...values,
                    _id: selectedMilestone._id
                };
                await updateMilestone(payload);
            } else {
                await addMilestone(values);
            }
            afterSubmit();
        }
    });

    return <MilestoneFormBasic />;
}
