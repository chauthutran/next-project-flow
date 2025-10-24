import MilestoneList from './list/MilestoneList';
import { useState } from 'react';
import MilestoneFormWrapper from './form/MilestoneFormWrapper';
import { useMilestones } from '@/hooks/useMilestones';
import PageTitle from '@/components/PageTitle';
import { PROJECT_STEPS } from '../project/ProjectWorkspace';
import SecondButton from '@/components/buttons/SecondButton';
import useListPage from '@/hooks/useListPage';
import { IMilestoneDTO } from '@/types/milestone';
import AccentButton from '@/components/buttons/AccentButton';

export default function MilestonePage({ projectId }: { projectId: string }) {
    const { milestones, status, selectMilestone, deleteMilestone } =
        useMilestones();

    const {
        showForm,
        setShowForm,
        handleAddNew,
        handleEdit,
        handleDelete,
        ConfirmDialogComponent
    } = useListPage<IMilestoneDTO>({
        deleteFn: deleteMilestone,
        deleteStatus: status.delete,
        selectFn: selectMilestone
    });

    if (status.fetch.loading || !milestones)
        return <div>{status.fetch.loading}... </div>;

    const projectTitleInfo = PROJECT_STEPS[3];
    const IconComponent = projectTitleInfo.icon;

    return (
        <div>
            {ConfirmDialogComponent}

            <div className="bg-white px-6">
                {!showForm && (
                    <>
                        <PageTitle
                            title={projectTitleInfo.label}
                            subtitle={projectTitleInfo.description}
                            icon={<IconComponent />}
                            action={
                                <SecondButton
                                    type="button"
                                    title="+ New Milestone"
                                    onClick={handleAddNew}
                                />
                            }
                        />
                        <MilestoneList
                            milestones={milestones}
                            handleOnItemEdit={handleEdit}
                            handleOnDeleteItem={handleDelete}
                        />
                    </>
                )}

                {showForm && (
                    <>
                        <PageTitle
                            title={'Milestone Form'}
                            subtitle={projectTitleInfo.description}
                            icon={<IconComponent />}
                            action={
                                <AccentButton
                                    type="button"
                                    title="Cancel"
                                    onClick={() => setShowForm(false)}
                                />
                            }
                        />

                        <MilestoneFormWrapper
                            projectId={projectId}
                            onClose={() => setShowForm(false)}
                            afterSubmit={() => {}}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
