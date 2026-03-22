import MilestoneList from './list/MilestoneList';
import MilestoneFormWrapper from './form/MilestoneFormWrapper';
import { useMilestones } from '@/app/hooks/useMilestones';
import PageTitle from '@/app/components/PageTitle';
import { PROJECT_STEPS } from '../project/ProjectWorkspace';
import SecondButton from '@/app/components/buttons/SecondButton';
import useResourcePage from '@/app/hooks/useResourcePage';
import { IMilestoneDTO } from '@/app/types/milestone';
import AccentButton from '@/app/components/buttons/AccentButton';

export default function MilestonePage({ projectId }: { projectId: string }) {
    const { milestones, status, selectMilestone, deleteMilestone } =
        useMilestones();

    const {
        showForm,
        handleCloseForm,
        handleAddNew,
        handleEdit,
        handleDelete,
        ConfirmDialogComponent
    } = useResourcePage<IMilestoneDTO>({
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

            <div className="bg-white">
                <PageTitle
                    title={showForm ? 'Milestone Form' : 'Milestones'}
                    subtitle={projectTitleInfo.description}
                    icon={<IconComponent />}
                    action={
                        showForm ? (
                            <AccentButton
                                type="button"
                                title="Cancel"
                                onClick={handleCloseForm}
                            />
                        ) : (
                            <SecondButton
                                type="button"
                                title="+ New Milestone"
                                onClick={handleAddNew}
                            />
                        )
                    }
                />

                {showForm ? (
                    <MilestoneFormWrapper
                        projectId={projectId}
                        onClose={handleCloseForm}
                        afterSubmit={() => {}}
                    />
                ) : (
                    <MilestoneList
                        milestones={milestones}
                        handleOnItemEdit={handleEdit}
                        handleOnDeleteItem={handleDelete}
                    />
                )}
            </div>
        </div>
    );
}
