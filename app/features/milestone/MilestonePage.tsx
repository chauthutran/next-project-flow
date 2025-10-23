import MilestoneList from './list/MilestoneList';
import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import MilestoneFormWrapper from './form/MilestoneFormWrapper';
import { useMilestones } from '@/hooks/useMilestones';
import PageTitle from '@/components/PageTitle';
import { PROJECT_STEPS } from '../project/ProjectWorkspace';
import SecondButton from '@/components/buttons/SecondButton';

export default function MilestonePage({ projectId }: { projectId: string }) {
    const { milestones, loading } = useMilestones();
    const [showMilestoneForm, setShowMilestoneForm] = useState(false);

    if (loading || !milestones) return <div>Loading milestones... </div>;

    const projectTitleInfo = PROJECT_STEPS[3];
    const IconComponent = projectTitleInfo.icon;

    return (
        <div>
            <PageTitle
                title={projectTitleInfo.label}
                subtitle={projectTitleInfo.description}
                icon={<IconComponent />}
                action={
                    <SecondButton
                        type="button"
                        title="+ New Project"
                        onClick={() => setShowMilestoneForm(true)}
                    />
                }
            />

            {!showMilestoneForm && <MilestoneList milestones={milestones} />}

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
                                Form
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
