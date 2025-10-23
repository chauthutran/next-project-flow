import MeetingList from './list/MeetingList';
import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import Modal from '@/components/Modal';
import { IoIosCloseCircle } from 'react-icons/io';
import { useMeetings } from '@/hooks/useMeetings';
import MeetingFormWrapper from './form/MeetingFormWrapper';
import PageTitle from '@/components/PageTitle';
import { PROJECT_STEPS } from '../project/ProjectWorkspace';
import SecondButton from '@/components/buttons/SecondButton';

export default function MeetingPage({ projectId }: { projectId: string }) {
    const { meetings, loading } = useMeetings();
    const [showMeetingForm, setShowMeetingForm] = useState(false);

    if (loading || !meetings) return <div>Loading meeetings... </div>;

    const projectTitleInfo = PROJECT_STEPS[2];
    const IconComponent = projectTitleInfo.icon;

    return (
        <div className="bg-white w-full">
            <PageTitle
                title={projectTitleInfo.label}
                subtitle={projectTitleInfo.description}
                icon={<IconComponent />}
                action={
                    <SecondButton
                        type="button"
                        title="+ New Project"
                        onClick={() => setShowMeetingForm(true)}
                    />
                }
            />
            {!showMeetingForm && <MeetingList meetings={meetings} />}

            {showMeetingForm && (
                <div className="">
                    <nav
                        className="text-[var(--link-text mb-2"
                        aria-label="Breadcrumb"
                    >
                        <ol className="inline-flex items-center space-x-2">
                            <li
                                className="hover:text-[var(--link-hover-text)] transition-colors font-medium cursor-pointer"
                                onClick={() => setShowMeetingForm(false)}
                            >
                                Meeting List
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
                        <MeetingFormWrapper
                            projectId={projectId}
                            onClose={() => setShowMeetingForm(false)}
                            afterSubmit={() => {}}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
