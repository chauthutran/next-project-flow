import { formatDateTimeObj } from '@/app/lib/utils';
import { CustomEventType } from './ProjectCalendar';

export default function ProjectEventList({
    eventList
}: {
    eventList: CustomEventType[];
}) {
    return (
        <div className="space-y-4">
            <div className="bg-[var(--bg)] rounded-xl p-4 shadow-sm h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-[var(--feature-info-sub-text)]">
                        {eventList?.length || 0} events
                    </span>
                </div>

                {/* Empty state */}
                {!eventList || eventList.length === 0 ? (
                    <div className="text-sm bg-[var(--feature-info-sub-text)] text-center py-6">
                        No events for this day
                    </div>
                ) : (
                    <div className="space-y-3">
                        {eventList.map(
                            (event: CustomEventType, idx: number) => (
                                <div
                                    key={`today_event_${idx}`}
                                    className="flex gap-3 p-3 rounded-lg border hover:shadow-sm transition"
                                >
                                    {/* Color indicator */}
                                    <div
                                        className="w-2 rounded-full"
                                        style={{ backgroundColor: event.color }}
                                    />

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="font-medium text-[var(--feature-info-text)] text-[var(--feature-info-text)]">
                                            {event.title}
                                        </div>

                                        <div className="text-xs text-[var(--feature-info-sub-text)]">
                                            Due: {formatDateTimeObj(event.end)}
                                        </div>

                                        {event.description && (
                                            <div className="text-sm text-[var(--feature-info-text)] mt-1 line-clamp-2">
                                                {event.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
