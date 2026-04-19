import { JSONObject } from '@/app/lib/definations';
import * as Utils from '@/app/lib/utils';
import { useEffect } from 'react';
import {
    VerticalTimeline,
    VerticalTimelineElement
} from 'react-vertical-timeline-component';

const toRGBA = (rgb: string, opacity: number) => {
  return rgb.replace("rgb", "rgba").replace(")", `, ${opacity})`);
};

export default function UserProjectsTimeline({
    projects,
    details
}: {
    projects?: JSONObject[];
    details: JSONObject;
}) {
    const timelineList = Utils.convertProgramDetails(details, projects);
    useEffect(() => {
        // Add class after component mounts
        if (
            document.querySelector('.vertical-timeline') !== null &&
            document.querySelector('.vertical-timeline')!.classList != null
        )
            document
                .querySelector('.vertical-timeline')!
                .classList.remove('vertical-timeline--animate');
    }, []);

    return (
        <div className="relative h-full py-6 px-5 bg-[var(--bg)]">
            <VerticalTimeline className="">
                {timelineList.map((item: JSONObject, index: number) => {
                    const IconComponent = item.icon;

                    return (
                        <VerticalTimelineElement
                            key={item._id}
                            date={item.date}
                            icon={<IconComponent />}
                            iconStyle={{
                                background: item.bgColor || '#3b82f6',
                                color: '#fff'
                            }}
                            contentStyle={{
                                backgroundColor: `${toRGBA(item.bgColor, 0.05)}`, // VERY light tint
                                border: "1px solid #e5e7eb",
                                borderLeft: `4px solid ${toRGBA(item.bgColor, 0.4)}`, // ⭐ main accent
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                padding: "16px",
                            }}
                            contentArrowStyle={{
                                borderRight: `10px solid ${toRGBA(item.bgColor, 0.4)}`
                            }}
                        >
                            {/* Title + Status */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {item.status && (
                                    <span
                                        className="text-xs px-2 py-1 rounded-md font-medium"
                                        style={{
                                            backgroundColor: `${Utils.getStatusColor(item.status)}20`, // soft color
                                            color: Utils.getStatusColor(
                                                item.status
                                            )
                                        }}
                                    >
                                        {Utils.getStatusName(item.status)}
                                    </span>
                                )}

                                <h3 className="font-semibold text-[var(--feature-info-text)]">
                                    {item.name}
                                </h3>
                            </div>

                            {/* Description */}
                            {item.description && (
                                <p className="text-sm text-[var(--feature-info-text)] mt-2 leading-relaxed">
                                    {item.description}
                                </p>
                            )}
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>
        </div>
    );
}
