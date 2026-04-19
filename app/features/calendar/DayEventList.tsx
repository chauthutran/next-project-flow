import { JSONObject } from '@/app/lib/definations';
import { formatTime } from '@/app/lib/utils';
import { CustomEventType } from './ProjectCalendar';

export default function DayEventList({ data }: { data: JSONObject }) {
    console.log("DayEventList data: ", data);
    return (
        <div className="p-4">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">
                    {new Date(data.date).toDateString()}
                </h2>
                <p className="text-sm text-[var(--feature-info-sub-text)]">{data.events.length} events</p>
            </div>

            {/* Event List */}
            <div className="space-y-3">
                {data.events.map((event: CustomEventType, i: number) => (
                    <div
                        key={i}
                        className="flex rounded-xl shadow-sm border bg-[var(--bg)] hover:shadow-md transition"
                    >
                        {/* Color bar */}
                        <div
                            className="w-2 rounded-l-xl"
                            style={{ backgroundColor: event.color }}
                        />

                        {/* Content */}
                        <div className="p-3 flex-1">
                            <h3 className="font-medium text-[var(--feature-info-sub-text)]">
                                {event.title}
                            </h3>

                            <p className="text-xs text-[var(--feature-info-sub-text)]">
                                {formatTime(event.start)} -{' '}
                                {formatTime(event.end)}
                            </p>

                            <p className="text-sm text-[var(--feature-info-text)] mt-1 line-clamp-2">
                                {event.description || "No description provided."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
