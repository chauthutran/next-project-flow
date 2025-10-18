import withFormHandler from '@/hoc/withFormHandler';
import useAuth from '@/hooks/useAuth';
import ProjectForm from './ProjectForm';
import { IProjectDTO } from '@/types/project';
import { projectSchema } from './projectSchema';
import { useProjects } from '@/hooks/useProjects';
import ProjectStepper from './components/ProjectStepper';
import { useEffect, useState } from 'react';

export default function ProjectFormWrapper({
    afterSubmit = () => {}
}: {
    afterSubmit: () => void;
}) {
    const { user } = useAuth();
    const { selectedProject, addProject } = useProjects();
    // const [currentStep, setCurrentStep] = useState(0);

    const ProjectFormBasic = withFormHandler<IProjectDTO>(ProjectForm, {
        initialValues: {
            name: selectedProject?.name || '',
            description: selectedProject?.description || '',
            startDate: selectedProject?.startDate || '',
            endDate: selectedProject?.endDate || '',
            status: selectedProject?.status || 'not_started',
            managedBy: user!._id!,
            teamMembers: selectedProject?.teamMembers || []
        },
        validationSchema: projectSchema,
        onSubmit: async (values) => {
            await addProject(values);
            afterSubmit();
        }
    });

    return <ProjectFormBasic />;
}
