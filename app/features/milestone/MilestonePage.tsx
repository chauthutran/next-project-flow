import MilestoneList from './list/MilestoneList';
import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import MilestoneFormWrapper from './form/MilestoneFormWrapper';
import { useMilestones } from '@/hooks/useMilestones';

export default function MilestonePage({ projectId }: { projectId: string }) {
    const { milestones, loading } = useMilestones();
    const [showMilestoneForm, setShowMilestoneForm] = useState(false);

    if (loading || !milestones) return <div>Loading milestones... </div>;

    return (
        <div>
            {!showMilestoneForm && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Milestone List
                        </h2>
                        <button
                            onClick={() => setShowMilestoneForm(true)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                            <IoIosAddCircle className="size-5" />
                            New
                        </button>
                    </div>

                    <MilestoneList milestones={milestones} />
                </>
            )}

            {showMilestoneForm && (
                <div className="">
                    <nav
                        className="text-[var(--link-text mb-2"
                        aria-label="Breadcrumb"
                    >
                        <ol className="inline-flex items-center space-x-2">
                            <li
                                className="hover:text-[var(--link-hover-text)] transition-colors font-medium cursor-pointer"
                                onClick={() => setShowMilestoneForm(false)}
                            >
                                Milestone List
                            </li>
                            <li>
                                <span className="text-[var(--link-text)]">
                                    ›
                                </span>
                            </li>
                            <li className="text-[var(--link-active-text)] font-medium">
                                Task Form
                            </li>
                        </ol>
                    </nav>

                    <div className="p-5 rounded-md bg-gray-100">
                        <MilestoneFormWrapper
                            projectId={projectId}
                            onClose={() => setShowMilestoneForm(false)}
                            afterSubmit={() => {}}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
