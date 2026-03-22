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

            <div className="bg-white">
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

        // <div className="bg-white w-full">
        //     <PageTitle
        //         title={projectTitleInfo.label}
        //         subtitle={projectTitleInfo.description}
        //         icon={<IconComponent />}
        //         action={
        //             <SecondButton
        //                 type="button"
        //                 title="+ New Project"
        //                 onClick={() => setShowMeetingForm(true)}
        //             />
        //         }
        //     />
        //     {!showMeetingForm && <MeetingList meetings={meetings} />}

        //     {showMeetingForm && (
        //         <div className="">
        //             <nav
        //                 className="text-[var(--link-text mb-2"
        //                 aria-label="Breadcrumb"
        //             >
        //                 <ol className="inline-flex items-center space-x-2">
        //                     <li
        //                         className="hover:text-[var(--link-hover-text)] transition-colors font-medium cursor-pointer"
        //                         onClick={() => setShowMeetingForm(false)}
        //                     >
        //                         Meeting List
        //                     </li>
        //                     <li>
        //                         <span className="text-[var(--link-text)]">
        //                             ›
        //                         </span>
        //                     </li>
        //                     <li className="text-[var(--link-active-text)] font-medium">
        //                         Form
        //                     </li>
        //                 </ol>
        //             </nav>

        //             <div className="p-5 rounded-md bg-gray-100">
        //                 <MeetingFormWrapper
        //                     projectId={projectId}
        //                     onClose={() => setShowMeetingForm(false)}
        //                     afterSubmit={() => {}}
        //                 />
        //             </div>
        //         </div>
        //     )}
        // </div>
    );
}
