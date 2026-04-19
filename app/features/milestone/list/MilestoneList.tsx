import { IMilestoneDTO } from '@/app/types/milestone';
import { STATUS_DETAILS } from '@/app/types/status';
import * as Utils from '@/app/lib/utils';
import ExpandableTable from '@/app/components/ExpandableTable';
import { Typography } from '@mui/material';

export default function MilestoneList({
    milestones,
    handleOnItemEdit,
    handleOnDeleteItem
}: {
    milestones: IMilestoneDTO[];
    handleOnItemEdit: (selected: IMilestoneDTO) => void;
    handleOnDeleteItem: (milestone: IMilestoneDTO) => void;
}) {
    if (!milestones.length) {
        return (
            <div className="text-[var(--feature-info-sub-text)]">
                No milestones yet. Click <strong>+ New milestone</strong> to
                create one.
            </div>
        );
    }
    const sortedList =
        milestones.length === 0
            ? []
            : [...milestones].sort(
                  (a, b) =>
                      Utils.convertDateStrToObj(a.dueDate).getTime() -
                      Utils.convertDateStrToObj(b.dueDate).getTime()
              );

    return (
        <ExpandableTable
            data={sortedList}
            getRowId={(m) => m._id!}
            columns={[
                { key: 'name', label: 'Name' },
                { key: 'dueDate', label: 'Due Date' },
                {
                    key: 'status',
                    label: 'Status',
                    render: (milestone: IMilestoneDTO) => {
                        const statusInfo = STATUS_DETAILS[milestone.status];
                        return (
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
                            >
                                {statusInfo.name.toUpperCase()}
                            </span>
                        );
                    }
                }
            ]}
            renderExpandedContent={(milestone) => (
                <div className="flex flex-col gap-1 space-y-2  pl-3">
                    <Typography
                        variant="body2"
                        component="p"
                    >
                        <span className="font-medium text-[var(--feature-info-text)]">
                            📝 Description:
                        </span>{' '}
                        <span className="text-[var(--feature-info-sub-text)]">
                            {milestone.description}
                        </span>
                    </Typography>

                    {milestone.assignedTo.length > 0 && (
                        <Typography
                            variant="body2"
                            component="p"
                        >
                            <span className="font-medium text-[var(--feature-info-text)]">
                                👥 Assigned To:
                            </span>{' '}
                            <span className="text-[var(--feature-info-sub-text)]">
                                {milestone.assignedTo.join(', ')}
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
