import * as Utils from '@/app/lib/utils';
import { IMeetingDTO } from '@/app/types/meeting';
import { Typography } from '@mui/material';
import React from 'react';
import ExpandableTable from '@/app/components/ExpandableTable';

export default function MeetingList({
    meetings,
    handleOnItemEdit,
    handleOnDeleteItem
}: {
    meetings: IMeetingDTO[];
    handleOnItemEdit: (selected: IMeetingDTO) => void;
    handleOnDeleteItem: (meeting: IMeetingDTO) => void;
}) {
    if (!meetings.length) {
        return (
            <div className="text-[var(--feature-info-sub-text)]">
                No meetings yet. Click <strong>+ New Meeting</strong> to create
                one.
            </div>
        );
    }

    const sortedList =
        meetings.length === 0
            ? []
            : [...meetings].sort(
                  (a, b) =>
                      Utils.convertDateStrToObj(a.date).getTime() -
                      Utils.convertDateStrToObj(b.date).getTime()
              );

    return (
        <ExpandableTable
            data={sortedList}
            getRowId={(m) => m._id!}
            columns={[
                { key: 'name', label: 'Name' },
                {
                    key: 'date',
                    label: 'Date',
                    render: (meeting: IMeetingDTO) =>
                        new Date(meeting.date).toLocaleDateString()
                }
            ]}
            renderExpandedContent={(meeting) => (
                <div className="flex flex-col gap-1 space-y-2  pl-3">
                    <Typography variant="body2" component="p">
                        <span className="font-medium text-[var(--feature-info-text)]">
                            📝 Description:
                        </span>{' '}
                        <span className="text-[var(--feature-info-sub-text)]">
                            {meeting.description}
                        </span>
                    </Typography>

                    {meeting.meetingNotes && (
                        <Typography variant="body2" component="p">
                            <span className="font-medium text-[var(--feature-info-text)]">
                                📝 Note:
                            </span>{' '}
                            <span className="text-[var(--feature-info-sub-text)]">
                                {meeting.meetingNotes}
                            </span>
                        </Typography>
                    )}

                    {meeting.participants.length > 0 && (
                        <Typography variant="body2" component="p">
                            <span className="font-medium text-[var(--feature-info-text)]">
                                👥 Participants:
                            </span>{' '}
                            <span className="text-[var(--feature-info-sub-text)]">
                                {meeting.participants.join(', ')}
                            </span>
                        </Typography>
                    )}
                </div>
            )}
            onEdit={(m) => handleOnItemEdit(m)}
            onDelete={(m) => handleOnDeleteItem(m)}
        />
    );
}
