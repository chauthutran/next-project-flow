import withFormHandler from '@/app/hoc/formHandler/withFormHandler';
import useAuth from '@/app/hooks/useAuth';
import ProjectForm from './ProjectForm';
import { IProjectDTO, IProjectPayload } from '@/app/types/project';
import { projectSchema } from './projectSchema';
import { useProjects } from '@/app/hooks/useProjects';
import PageTitle from '@/app/components/PageTitle';
import { PROJECT_STEPS } from '../ProjectWorkspace';
import useNotifier from '@/app/hooks/useNotifier';

export default function ProjectFormWrapper({
    afterSubmit = () => {}
}: {
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedProject, addProject, updateProject, status } =
        useProjects();

    useNotifier(status.update);
    
    const ProjectFormBasic = withFormHandler<IProjectPayload>(ProjectForm, {
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
            return selectedProject
                ? !!status.update.loading
                : !!status.add.loading;
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

    const projectTitleInfo = PROJECT_STEPS[0];
    const IconComponent = projectTitleInfo.icon;

    return (
        <>
            <PageTitle
                title={projectTitleInfo.label}
                subtitle={projectTitleInfo.description}
                icon={<IconComponent />}
            />

            <ProjectFormBasic />
        </>
    );
}
