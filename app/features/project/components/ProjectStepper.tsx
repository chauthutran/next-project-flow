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

export const CustomStepIcon = (props: StepIconProps) => {
    const { active, completed, icon } = props;
    const IconComponent = PROJECT_STEPS[(icon as number) - 1].icon;

    return (
        <div className="relative flex items-center justify-center w-10 h-10 transition-all duration-200 group-hover:scale-105">
            {/* Outer ring for active */}
            {active && !completed && (
                <div className="absolute w-full h-full rounded-full ring-4 ring-blue-300" />
            )}

            {/* Inner circle */}
            <div
                className={`
          flex items-center justify-center rounded-full transition-all duration-200
          ${
              completed
                  ? 'bg-green-500 border-green-500 text-white w-10 h-10'
                  : ''
          }
          ${active && !completed ? 'bg-blue-500 text-white w-8 h-8' : ''}
          ${
              !active && !completed
                  ? 'border-gray-300 bg-white text-gray-400 border-2 w-10 h-10'
                  : ''
          }
          group-hover:bg-blue-100 group-hover:border-blue-300 group-hover:text-blue-600
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
                        <StepLabel StepIconComponent={CustomStepIcon}>
                            <div className="group flex items-center cursor-pointer">
                                {/* Label + description */}
                                <div className="ml-3">
                                    <Typography
                                        variant="body1"
                                        className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
                                    >
                                        {step.label}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors"
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
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50"
                >
                    <FaArrowLeft /> Previous
                </button>

                {activeStep === PROJECT_STEPS.length - 1 ? (
                    <button
                        onClick={() => alert('Project Created!')}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
                    >
                        <FaCheck /> Finish
                    </button>
                ) : (
                    <button
                        onClick={() => setActiveStep(activeStep + 1)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Next <FaArrowRight />
                    </button>
                )}
            </div>

            {/* <div className="flex justify-between my-3">
                <Button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(activeStep - 1)}
                >
                    Back
                </Button>
                <Button
                    onClick={() =>
                        setActiveStep(
                            Math.min(activeStep + 1, PROJECT_STEPS.length - 1)
                        )
                    }
                >
                    {activeStep === PROJECT_STEPS.length - 1
                        ? 'Finish'
                        : 'Next'}
                </Button>
            </div> */}
        </div>
    );
}
