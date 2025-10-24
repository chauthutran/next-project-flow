import { ITaskDTO } from '@/types/task';
import { STATUS_DETAILS } from '@/types/status';
import * as Utils from '@/lib/utils';
import { Typography } from '@mui/material';
import ExpandableTable from '@/components/ExpandableTable';
import { BiCalendar } from 'react-icons/bi';

export default function TaskList({
    tasks,
    handleOnItemEdit,
    handleOnDeleteItem
}: {
    tasks: ITaskDTO[];
    handleOnItemEdit: (selected: ITaskDTO) => void;
    handleOnDeleteItem: (task: ITaskDTO) => void;
}) {
    if (!tasks.length) {
        return (
            <div className="text-gray-500">
                No tasks yet. Click <strong>+ New Task</strong> to create one.
            </div>
        );
    }

    const sortedList =
        tasks.length === 0
            ? []
            : [...tasks].sort(
                  (a, b) =>
                      Utils.convertDateStrToObj(a.startDate).getTime() -
                      Utils.convertDateStrToObj(b.startDate).getTime()
              );

    return (
        <ExpandableTable
            data={sortedList}
            getRowId={(m) => m._id!}
            columns={[
                { key: 'name', label: 'Name' },
                {
                    key: 'status',
                    label: 'Status',
                    render: (task: ITaskDTO) => {
                        const statusInfo = STATUS_DETAILS[task.status];
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
            renderExpandedContent={(task) => (
                <div className="flex flex-col gap-1 space-y-2  pl-3">
                    <Typography
                        variant="body2"
                        className="text-gray-700 flex space-x-1"
                        component="div"
                    >
                        <div className="flex space-x-1 font-medium">
                            <BiCalendar size={20} />
                            <span className="text-blue-600">Date Range:</span>
                        </div>{' '}
                        <div>
                            {new Date(task.startDate).toLocaleDateString()} →{' '}
                            {new Date(task.endDate).toLocaleDateString()}
                        </div>
                    </Typography>

                    <Typography
                        variant="body2"
                        className="text-gray-700"
                        component="p"
                    >
                        <span className="font-medium text-blue-600">
                            📝 Description:
                        </span>{' '}
                        {task.description}
                    </Typography>

                    {task.assignedTo.length > 0 && (
                        <Typography
                            variant="body2"
                            className="text-gray-700"
                            component="p"
                        >
                            <span className="font-medium text-blue-600">
                                👥 Assigned To:
                            </span>{' '}
                            {task.assignedTo.join(', ')}
                        </Typography>
                    )}
                </div>
            )}
            onEdit={(m) => handleOnItemEdit(m)}
            onDelete={(m) => handleOnDeleteItem(m)}
        />
    );
}
