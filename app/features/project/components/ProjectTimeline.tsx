"use client";

import React, { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { JSONObject } from '@/app/lib/definations';
import * as Utils from "@/app/lib/utils";
import { FaMeetup } from "react-icons/fa";
import { FaTasks } from 'react-icons/fa';
import { TbTargetArrow } from "react-icons/tb";


const ProjectTimeline = ({ data }:{data: JSONObject}) => {

    useEffect(() => {
        // Add class after component mounts
        if( document.querySelector('.vertical-timeline') !== null 
            &&  document.querySelector('.vertical-timeline')!.classList != null)
                document.querySelector('.vertical-timeline')!.classList.remove('vertical-timeline--animate');
    }, []);

    // const timelineList = convertData();
    const timelineList = Utils.convertProgramDetails(data);

    return (
        <>
            
            <h2 className="text-2xl font-semibold mb-6 flex justify-center border-b-2 border-light-sky-blue pb-2 w-fit pr-5">Timeline</h2>
            <VerticalTimeline className=''>
                {timelineList.map((item: JSONObject, index: number) => {
                    const IconComponent = item.icon;

                    return (
                        <VerticalTimelineElement
                            contentStyle={{ border: '2px solid #bfdbfe', backgroundColor: "#bfdbfe  ", color: '#fff', boxShadow: "0 3px 0 #fff" }}
                            contentArrowStyle={{ borderRight: '7px solid  #bfdbfe' }}
                            key={item._id}
                            date={item.date}
                            icon={<IconComponent />}
                            iconStyle={{ background: item.bgColor, color: item.textColor }}
                        >
                            <h3 className="vertical-timeline-element-title line-space text-black flex flex-row">
                                {item.status && <span className="px-2 py-1 rounded-md mr-4 whitespace-nowrap items-center flex" style={{backgroundColor: Utils.getStatusColor(item.status)}}>{Utils.getStatusName(item.status)}</span>}
                                <span className="font-bold">{item.name}</span>
                            </h3>
                            <div className="text-sm mt-3 text-black">{item.description}</div>
                        </VerticalTimelineElement>
                )})}
            </VerticalTimeline>
        </>
    );
};

export default ProjectTimeline;
