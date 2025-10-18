import { JSONObject } from '@/lib/definations';
import useAuth from '@/hooks/useAuth';
import MilestoneForm from './MilestoneForm';
import { IMilestoneDTO } from '@/types/milestone';
import withFormHandler from '@/hoc/withFormHandler';
import { milestoneSchema } from './milestoneSchema';
import { useMilestones } from '@/hooks/useMilestones';

export default function MilestoneFormWrapper({
    projectId,
    data = null,
    afterSubmit = () => {}
}: {
    projectId: string;
    data?: JSONObject | null;
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedMilestone, addMilestone } = useMilestones();

    const MilestoneFormBasic = withFormHandler<IMilestoneDTO>(MilestoneForm, {
        initialValues: {
            projectId: projectId,
            name: selectedMilestone?.name || '',
            description: selectedMilestone?.description || '',
            dueDate: selectedMilestone?.dueDate || '',
            status: selectedMilestone?.status || 'not_started',
            assignedTo: selectedMilestone?.assignedTo || [],
            createdBy: user!._id!
        },
        validationSchema: milestoneSchema,
        onSubmit: async (values) => {
            await addMilestone(values);
            afterSubmit();
        }
    });

    return <MilestoneFormBasic />;
}
