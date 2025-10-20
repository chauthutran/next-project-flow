import MilestoneList from './list/MilestoneList';
import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import Modal from '@/components/Modal';
import { IoIosCloseCircle } from 'react-icons/io';
import MilestoneFormWrapper from './form/MilestoneFormWrapper';
import { useMilestones } from '@/hooks/useMilestones';

export default function MilestonePage({ projectId }: { projectId: string }) {
    const { milestones, loading } = useMilestones();
    const [showMilestoneForm, setShowMilestoneForm] = useState(false);

    if (loading || !milestones) return <div>Loading milestones... </div>;

    return (
        <div>
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

            {showMilestoneForm && (
                <Modal>
                    <div className="bg-white rounded-lg w-3/4">
                        <h2 className="py-3 px-5 text-xl flex bg-blue-navy text-white rounded-t-lg items-center justify-between">
                            <div>Create New Milestone</div>
                            <div
                                className="flex cursor-pointer"
                                onClick={() => setShowMilestoneForm(false)}
                            >
                                <IoIosCloseCircle className="size-6" />
                            </div>
                        </h2>

                        <div className="p-5 rounded-md bg-gray-100">
                            <MilestoneFormWrapper
                                projectId={projectId}
                                afterSubmit={() => {}}
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
