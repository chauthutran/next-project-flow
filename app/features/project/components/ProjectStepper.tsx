import {
    Stepper,
    Step,
    StepLabel,
    StepIconProps,
    Typography
} from '@mui/material';
import { PROJECT_STEPS } from '../ProjectWorkspace';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';

type ProjectStepperProps = {
    activeStep: number;
    setActiveStep: (step: number) => void;
};

type CustomStepIconProps = StepIconProps & {
    activeStep: number;
};

const CustomStepIcon = (props: CustomStepIconProps) => {
    const { active, completed, icon, activeStep } = props;
    const stepIndex = (icon as number) - 1;
    const isPast = stepIndex < activeStep;
    const isCurrent = stepIndex === activeStep;
    const IconComponent = PROJECT_STEPS[(icon as number) - 1].icon;
    
    return (
        <div className="relative flex items-center justify-center w-10 h-10 transition-all duration-200 group-hover:scale-105">
            {/* Outer ring for active */}
            {active && !completed && (
                <div className="absolute w-full h-full rounded-full ring-4 ring-[var(--primary-ring)]" />
            )}

            {/* Inner circle */}
            <div
                className={`
                    flex items-center justify-center rounded-full transition-all duration-200
                    group-hover:bg-[var(--primary-hover)] group-hover:border-[var(--primary-ring)] group-hover:text-[var(--primary-hover)]
                    
                    ${
                    isPast
                        ? 'bg-[var(--primary)] text-[var(--primary-text)] w-8 h-8'
                        : ''
                    }
                    ${isCurrent ? 'bg-[var(--primary)] text-[var(--primary-text)] w-8 h-8' : ''}
                    
                    ${
                        !isPast && !isCurrent
                            ? 'border-[var(--btn-disabled-border)] bg-[var(--btn-disabled-bg)] text-[var(--feature-info-sub-text)] border-2 w-10 h-10'
                            : ''
                    }
                `}
            >
                <IconComponent size={active && !completed ? 16 : 20} />
            </div>
        </div>
    );
};

export default function ProjectStepper({
    activeStep,
    setActiveStep
}: ProjectStepperProps) {
    
    return (
        <div className="flex flex-col w-full px-6 space-y-5">
            {/* <Stepper activeStep={activeStep} orientation="vertical" > */}
            <Stepper activeStep={activeStep}>
                {PROJECT_STEPS.map((step, i) => (
                    <Step key={step.label} onClick={() => setActiveStep(i)}>
                        <StepLabel
                            StepIconComponent={(props) => (
                                <CustomStepIcon {...props} activeStep={activeStep} />
                            )}
                        >
                            <div className="group flex items-center cursor-pointer">
                                {/* Label + description */}
                                <div className="ml-3">
                                    <Typography
                                        variant="body1"
                                        className="font-bold text-[var(--feature-info-text)] group-hover:text-[var(--primary-hover)] transition-colors"
                                    >
                                        {step.label}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="text-xs text-[var(--feature-info-sub-text)] group-hover:text-[var(--primary-hover)] transition-colors"
                                    >
                                        {step.description}
                                    </Typography>
                                </div>
                            </div>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full">
                <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    disabled={activeStep === 0}
                    className="flex items-center gap-2 px-4 py-1 rounded-md bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-[var(--secondary-text)] transition disabled:opacity-80 text-sm"
                >
                    <FaArrowLeft /> Previous
                </button>

                {activeStep === PROJECT_STEPS.length - 1 ? (
                    <button
                        onClick={() => alert('Project saved !')}
                        className="flex items-center gap-2 px-4 py-1 rounded-md bg-green-600 text-white hover:bg-green-500 transition text-sm"
                    >
                        <FaCheck /> Finish
                    </button>
                ) : (
                    <button
                        onClick={() => setActiveStep(activeStep + 1)}
                        className="flex items-center gap-2 px-4 py-1 rounded-md bg-[var(--primary)] text-[var(--primary-text)] hover:bg-[var(--primary-hover)] transition text-sm"
                    >
                        Next <FaArrowRight />
                    </button>
                )}
            </div>
        </div>
    );
}
