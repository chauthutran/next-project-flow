'use client';

import { motion, AnimatePresence } from 'framer-motion';

type ProjectStepperProps = {
    currentStep: number;
    // onStepChange: (step: number) => void;
};

const steps = ['Project Details', 'Tasks', 'Meetings', 'Milestones'];

export default function ProjectStepper({
    currentStep,
    // onStepChange
}:
ProjectStepperProps) {

    return (
        <div className="mx-auto">
            {/* Stepper Header */}
            <div className="flex items-center justify-between mb-8">
                {steps.map((label, i) => (
                    <div key={label} className="flex-1 flex items-center">
                        <div
                            className={`flex items-center justify-center w-9 h-9 rounded-full border-2 font-semibold text-sm
                ${
                    i < currentStep
                        ? 'bg-green-500 border-green-500 text-white'
                        : i === currentStep
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300 text-gray-400'
                }`}
                        >
                            {i < currentStep ? '✓' : i + 1}
                        </div>
                        <div
                            className={`ml-2 text-sm font-medium ${
                                i === currentStep
                                    ? 'text-blue-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            {label}
                        </div>
                        {i < steps.length - 1 && (
                            <div
                                className={`flex-1 h-[2px] mx-2 ${
                                    i < currentStep
                                        ? 'bg-green-500'
                                        : 'bg-gray-300'
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            {/* <div className="flex justify-between mt-6">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className={`px-4 py-2 rounded-md text-white ${
                        currentStep === steps.length - 1
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div> */}
        </div>
    );
}
