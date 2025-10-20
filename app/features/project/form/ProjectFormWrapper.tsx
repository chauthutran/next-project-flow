import withFormHandler from '@/hoc/withFormHandler';
import useAuth from '@/hooks/useAuth';
import ProjectForm from './ProjectForm';
import { IProjectDTO } from '@/types/project';
import { projectSchema } from './projectSchema';
import { useProjects } from '@/hooks/useProjects';

export default function ProjectFormWrapper({
    afterSubmit = () => {}
}: {
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedProject, addProject, updateProject , status} = useProjects();

    const ProjectFormBasic = withFormHandler<IProjectDTO>(ProjectForm, {
        initialValues: {
            name: selectedProject?.name || '',
            description: selectedProject?.description || '',
            startDate: selectedProject?.startDate.split('T')[0] || '',
            endDate: selectedProject?.endDate.split('T')[0] || '',
            status: selectedProject?.status || 'not_started',
            managedBy: user!._id!,
            teamMembers: selectedProject?.teamMembers || []
        },
        validationSchema: projectSchema,
        getLoading: () => {
            return (selectedProject) ? !!status.update.loading : !!status.add.loading;
        },
        onSubmit: async (values) => {
            if (selectedProject) {
                const payload = {
                    ...values,
                    _id: selectedProject._id
                };
                await updateProject(payload);
            } else {
                await addProject(values);
            }
            afterSubmit();
        }
    });

    return (
            <ProjectFormBasic />
    );
}
