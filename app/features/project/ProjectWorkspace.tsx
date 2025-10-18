import withFormHandler from '@/hoc/withFormHandler';
import useAuth from '@/hooks/useAuth';
import { IProjectDTO } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';
import { useEffect, useState } from 'react';
import ProjectFormWrapper from './form/ProjectFormWrapper';
import TaskFormWrapper from '../task/form/TaskFormWrapper';
import MeetingFormWrapper from '../meeting/form/MeetingFormWrapper';
import MilestoneFormWrapper from '../milestone/form/MilestoneFormWrapper';
import ProjectStepper from './form/components/ProjectStepper';

export default function ProjectWorkspace() {
    const { selectedProject } = useProjects();
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1);
    }
    
    const renderStepForm = () => {
        switch (currentStep) {
            case 0:
                return <ProjectFormWrapper afterSubmit={handleNextStep} />;
            case 1:
                return selectedProject ? (
                    <TaskFormWrapper
                        projectId={selectedProject._id!}
                        afterSubmit={handleNextStep}
                    />
                ) : null;
            case 2:
                return selectedProject ? (
                    <MeetingFormWrapper
                        projectId={selectedProject._id!}
                        afterSubmit={handleNextStep}
                    />
                ) : null;
            case 3:
                return selectedProject ? (
                    <MilestoneFormWrapper
                        projectId={selectedProject._id!}
                        afterSubmit={handleNextStep}
                    />
                ) : null;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="p-6">
                <ProjectStepper
                    currentStep={currentStep}
                    // onStepChange={setCurrentStep}
                />

                <div className="p-6 bg-[var(--card)] text-[var(--card-text)] rounded-lg border border-[var(--border)]">
                    {renderStepForm()}
                </div>

                {/* {step === 1 && <ProjectForm />} */}
                {/* {step === 2 && (
                    <TasksForm
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                )}
                {step === 3 && (
                    <MeetingsForm
                        onNext={() => setStep(4)}
                        onBack={() => setStep(2)}
                    />
                )}
                {step === 4 && (
                    <MilestonesForm
                        onBack={() => setStep(3)}
                        onFinish={handleSubmit}
                    />
                )} */}
            </div>
        </>
    );
}
