import MeetingList from './list/MeetingList';
import { useMeetings } from '@/app/hooks/useMeetings';
import MeetingFormWrapper from './form/MeetingFormWrapper';
import PageTitle from '@/app/components/PageTitle';
import { PROJECT_STEPS } from '../project/ProjectWorkspace';
import SecondButton from '@/app/components/buttons/SecondButton';
import { IMeetingDTO } from '@/app/types/meeting';
import useResourcePage from '@/app/hooks/useResourcePage';
import AccentButton from '@/app/components/buttons/AccentButton';

export default function MeetingPage({ projectId }: { projectId: string }) {
    const { meetings, status, selectMeeting, deleteMeeting } = useMeetings();
    const {
        showForm,
        handleAddNew,
        handleEdit,
        handleDelete,
        handleCloseForm,
        ConfirmDialogComponent
    } = useResourcePage<IMeetingDTO>({
        deleteFn: deleteMeeting,
        deleteStatus: status.delete,
        selectFn: selectMeeting
    });

    if (status.fetch.loading || !meetings)
        return <div>{status.fetch.loading}... </div>;

    const projectTitleInfo = PROJECT_STEPS[2];
    const IconComponent = projectTitleInfo.icon;

    return (
        <div>
            {ConfirmDialogComponent}

            <div className="bg-[var(--card)]">
                <PageTitle
                    title={showForm ? 'Meeting Form' : 'Meetings'}
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
                                title="+ New Task"
                                onClick={handleAddNew}
                            />
                        )
                    }
                />

                {showForm ? (
                    <MeetingFormWrapper
                        projectId={projectId}
                        onClose={handleCloseForm}
                        afterSubmit={() => {}}
                    />
                ) : (
                    <MeetingList
                        meetings={meetings}
                        handleOnItemEdit={handleEdit}
                        handleOnDeleteItem={handleDelete}
                    />
                )}
            </div>
        </div>
    );
}
