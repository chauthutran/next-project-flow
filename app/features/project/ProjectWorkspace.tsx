import { useProjects } from '@/hooks/useProjects';
import { useEffect, useState } from 'react';
import ProjectFormWrapper from './form/ProjectFormWrapper';
import ProjectStepper from './form/components/ProjectStepper';
import TaskPage from '../task/TaskPage';
import MeetingPage from '../meeting/MeetingPage';
import MilestonePage from '../milestone/MilestonePage';
import useConfirmDialog from '@/components/dialog/useConfirmDialog';

export default function ProjectWorkspace() {
    const { selectedProject, status: projectStatus } = useProjects();
    const [currentStep, setCurrentStep] = useState(0);
    const { openDialog, ConfirmDialogComponent } = useConfirmDialog({
        title: 'Warning'
    });

    useEffect(() => {});
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
    
    if (selectedProject && projectStatus.fetch.loading)
        return <div>{projectStatus.fetch.loading}...</div>;

    if (projectStatus.add.loading)
        return <div>{projectStatus.update.loading} ...</div>;
    if (projectStatus.update.loading)
        return <div>{projectStatus.update.loading} ...</div>;

    return (
        <>
            {ConfirmDialogComponent}

            <div className="p-6">
                <ProjectStepper
                    currentStep={currentStep}
                    onStepChange={setCurrentStep}
                />

                <div className="p-6 bg-[var(--card)] text-[var(--card-text)] rounded-lg border border-[var(--border)]">
                    {renderStepForm()}
                </div>
            </div>
        </>
    );
}
