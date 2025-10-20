import { IMilestoneDTO } from '@/types/milestone';
import { STATUS_DETAILS } from '@/types/status';
import * as Utils from '@/lib/utils';

export default function MilestoneList({
    milestones
}: {
    milestones: IMilestoneDTO[];
}) {
    const sortedData =
        milestones.length === 0
            ? []
            : [...milestones].sort(
                  (a, b) =>
                      Utils.convertDateStrToObj(a.dueDate).getTime() -
                      Utils.convertDateStrToObj(b.dueDate).getTime()
              );

    return (
        <div className="divide-y divide-gray-200">
            {sortedData.map((m) => (
                <div
                    key={m._id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <h3 className="font-medium text-gray-800">{m.name}</h3>
                        <p className="text-sm text-gray-500">{m.description}</p>
                        <p className="text-xs text-gray-400">
                            Created by {m.createdBy}
                        </p>
                    </div>

                    <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                        <p className="text-sm text-gray-700">
                            Due Date:{' '}
                            <span className="font-semibold">
                                {new Date(m.dueDate).toLocaleDateString()}
                            </span>
                        </p>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium
                        ${STATUS_DETAILS[m.status].bgColor} ${
                                STATUS_DETAILS[m.status].textColor
                            }
                    }`}
                        >
                            {STATUS_DETAILS[m.status].name.toUpperCase()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
