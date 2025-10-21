import MeetingList from './list/MeetingList';
import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import Modal from '@/components/Modal';
import { IoIosCloseCircle } from 'react-icons/io';
import { useMeetings } from '@/hooks/useMeetings';
import MeetingFormWrapper from './form/MeetingFormWrapper';

export default function MeetingPage({ projectId }: { projectId: string }) {
    const { meetings, loading } = useMeetings();
    const [showMeetingForm, setShowMeetingForm] = useState(false);

    if (loading || !meetings) return <div>Loading meeetings... </div>;

    return (
        <div className="bg-white w-full">
            {!showMeetingForm && (
                <>
                    {' '}
                    <h2 className="text-2xl font-semibold mb-6 flex space-x-3">
                        <div className="border-b-2 border-light-sky-blue pb-2 w-fit pr-5">
                            Meeting List
                        </div>
                        <div
                            className="flex flex-1 items-end justify-end cursor-pointer hover:text-blue-500 text-royal-blue"
                            onClick={() => setShowMeetingForm(true)}
                        >
                            <IoIosAddCircle className="size-10" />
                        </div>
                    </h2>
                    <MeetingList meetings={meetings} />
                </>
            )}

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
                                List
                            </li>
                            <li>
                                <span className="text-[var(--link-text)]">
                                    ›
                                </span>
                            </li>
                            <li className="text-[var(--link-active-text)] font-medium">
                                Meeting Form
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
