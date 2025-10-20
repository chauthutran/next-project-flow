import * as Utils from '@/lib/utils';
import { IMeetingDTO } from '@/types/meeting';

export default function MeetingList({ meetings }: { meetings: IMeetingDTO[] }) {
    const sortedData =
        meetings.length === 0
            ? []
            : [...meetings].sort(
                  (a, b) =>
                      Utils.convertDateStrToObj(a.date).getTime() -
                      Utils.convertDateStrToObj(b.date).getTime()
              );

    return (
        <div className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
                    <tr>
                        <th className="px-6 py-3">Meeting</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Participants</th>
                        <th className="px-6 py-3">Notes</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {sortedData.map((meeting) => (
                        <tr
                            key={meeting._id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {meeting.name}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(meeting.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {meeting.participants.slice(0, 3).join(', ')}
                                {meeting.participants.length > 3 && '...'}
                            </td>
                            <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]">
                                {meeting.meetingNotes || '—'}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200">
                                    View
                                </button>
                                <button className="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
