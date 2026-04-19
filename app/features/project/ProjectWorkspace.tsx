import { useProjects } from '@/app/hooks/useProjects';
import { useEffect, useState } from 'react';
import ProjectFormWrapper from './form/ProjectFormWrapper';
import ProjectStepper from './components/ProjectStepper';
import TaskPage from '../task/TaskPage';
import MeetingPage from '../meeting/MeetingPage';
import MilestonePage from '../milestone/MilestonePage';
import useConfirmDialog from '@/app/components/dialog/useConfirmDialog';
import {
    FaCheckCircle,
    FaClipboardList,
    FaUsers,
    FaFlag
} from 'react-icons/fa';
import PageTitle from '@/app/components/PageTitle';
import SecondButton from '@/app/components/buttons/SecondButton';

export const PROJECT_STEPS = [
    {
        label: 'Project Details',
        icon: FaClipboardList,
        description: 'Set up project name, manager, and timeline.'
    },
    {
        label: 'Tasks',
        icon: FaCheckCircle,
        description: 'Add and assign project tasks.'
    },
    {
        label: 'Meetings',
        icon: FaUsers,
        description: 'Plan and schedule team meetings.'
    },
    {
        label: 'Milestones',
        icon: FaFlag,
        description: 'Define and track key milestones.'
    }
];

export default function ProjectWorkspace({
    projectId
}: {
    projectId?: string;
}) {
    const {fetchProjectById ,selectedProject, status: projectStatus } = useProjects();
    const [currentStep, setCurrentStep] = useState(0);
    const { openDialog, ConfirmDialogComponent } = useConfirmDialog({
        title: 'Warning'
    });

    useEffect(() => {
        if(projectId) {
            fetchProjectById(projectId);
        }
    },[projectId]);
    
    if (projectStatus.fetch.loading)
        return (
            <div className="text-center py-10 text-[var(--muted)]">
                {projectStatus.fetch.loading}...
            </div>
        );

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const renderStepForm = () => {
        switch (currentStep) {
            case 0:
                return <ProjectFormWrapper afterSubmit={handleNextStep} />;
            case 1:
                return selectedProject ? (
                    <TaskPage
                        projectId={selectedProject._id!}
                        // afterSubmit={handleNextStep}
                    />
                ) : null;
            case 2:
                return selectedProject ? (
                    <MeetingPage
                        projectId={selectedProject._id!}
                        // afterSubmit={handleNextStep}
                    />
                ) : null;
            case 3:
                return selectedProject ? (
                    <MilestonePage
                        projectId={selectedProject._id!}
                        // afterSubmit={handleNextStep}
                    />
                ) : null;
            default:
                return null;
        }
    };

    // if (selectedProject && projectStatus.fetch.loading)
    //     return <div>{projectStatus.fetch.loading}...</div>;

    // if (projectStatus.add.loading)
    //     return <div>{projectStatus.update.loading} ...</div>;
    // if (projectStatus.update.loading)
    //     return <div>{projectStatus.update.loading} ...</div>;

    return (
        <>
            {ConfirmDialogComponent}

           <div className="flex flex-col gap-6 px-6 py-4">
                <ProjectStepper
                    activeStep={currentStep}
                    setActiveStep={setCurrentStep}
                />

                <div className="p-6 bg-[var(--card)] text-[var(--card-text)] border border-[var(--card-border)]">
                    {renderStepForm()}
                </div>
            </div>
        </>
    );
}
