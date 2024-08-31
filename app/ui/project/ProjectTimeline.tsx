"use client";

import React, { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaTasks, FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import { JSONObject } from '@/lib/definations';


const ProjectTimeline = ({ data }:{data: JSONObject}) => {
    
    console.log(data);

    useEffect(() => {
        // Add class after component mounts
        if( document.querySelector('.vertical-timeline') !== null 
            &&  document.querySelector('.vertical-timeline')!.classList != null)
                document.querySelector('.vertical-timeline')!.classList.remove('vertical-timeline--animate');
    }, []);

    return (
        <VerticalTimeline>
            {data.milestones && data.milestones.map((milestone: JSONObject, index: number) => (
                <VerticalTimelineElement
                    key={milestone._id}
                    date={new Date(milestone.dueDate).toLocaleDateString()}
                    icon={<FaClipboardList />}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                >
                    <h3 className="vertical-timeline-element-title">{milestone.name}</h3>
                    <p>{milestone.description}</p>
                    <p>Status: {milestone.status}</p>
                </VerticalTimelineElement>
            ))}

            {data.tasks && data.tasks.map((task: JSONObject, index: number) => (
                <VerticalTimelineElement
                    key={task._id}
                    date={`${new Date(task.startDate).toLocaleDateString()} - ${new Date(task.endDate).toLocaleDateString()}`}
                    icon={<FaTasks />}
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                >
                    <h3 className="vertical-timeline-element-title">{task.name}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                </VerticalTimelineElement>
            ))}

            {data.mettings && data.mettings.map((meeting: JSONObject, index: number) => (
                <VerticalTimelineElement
                    key={meeting._id}
                    date={new Date(meeting.date).toLocaleDateString()}
                    icon={<FaCalendarCheck />}
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                >
                    <h3 className="vertical-timeline-element-title">{meeting.name}</h3>
                    <p>{meeting.description}</p>
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    );
};

export default ProjectTimeline;
