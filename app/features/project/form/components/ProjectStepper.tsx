import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { useState } from 'react';
import {
    FaCheckCircle,
    FaClipboardList,
    FaUsers,
    FaFlag
} from 'react-icons/fa';

type Step = {
    label: string;
    icon: React.ElementType;
};

type ProjectStepperProps = {
    activeStep: number;
    setActiveStep: (step: number) => void;
};

// const steps: Step[] = [
//     { label: 'Project Details', icon: FaClipboardList },
//     { label: 'Tasks', icon: FaCheckCircle },
//     { label: 'Meetings', icon: FaUsers },
//     { label: 'Milestones', icon: FaFlag }
// ];

const steps = ['Project Details', 'Tasks', 'Meetings', 'Milestones'];

export default function ProjectStepper({
    activeStep,
    setActiveStep
}: ProjectStepperProps) {
    return (
        <div className="w-full">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step
                        key={label}
                        //             sx={{
                        //   fontWeight: activeStep === index ? 'bold' : 'normal',
                        //   color: activeStep === index ? 'primary.main' : 'text.secondary',
                        // }}
                    >
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Navigation Buttons */}
            <div className="flex justify-between my-3">
                <Button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(activeStep - 1)}
                >
                    Back
                </Button>
                <Button
                    onClick={() =>
                        setActiveStep(
                            Math.min(activeStep + 1, steps.length - 1)
                        )
                    }
                >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    );
}
