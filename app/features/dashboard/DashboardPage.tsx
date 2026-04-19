'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import {
    FaHome,
    FaFolder,
    FaListAlt,
    FaUsers,
    FaCog,
    FaBell
} from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import useAuth from '@/app/hooks/useAuth';
import { useProjects } from '@/app/hooks/useProjects';
import { useTasks } from '@/app/hooks/useTasks';
import { ITaskDTO } from '@/app/types/task';
import axios from 'axios';
import { JSONObject } from '@/app/lib/definations';
import TaskCompletionOverview from './components/TaskCompletionOverview';
import { STATUS_DETAILS } from '@/app/types/status';
import WeeklyProgressTrend from './components/WeeklyProgressTrend';

export default function DashboardPage() {
    const { user } = useAuth();
    const { projects } = useProjects();
    const [inProgressTasks, setInProgressTasks] = useState<
        ITaskDTO[] | string | null
    >(null);
    const [notStartedTasks, setNotStartedTasks] = useState<
        ITaskDTO[] | string | null
    >(null);
    const [completedTasks, setCompletedTasks] = useState<
        ITaskDTO[] | string | null
    >(null);
    const [weeklyTasks, setWeeklyTasks] = useState<JSONObject[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllTasks();
        getWeeklyTasks();
    }, []);

    const getAllTasks = async () => {
        try {
            const response = await axios.get(
                `/api/reports/tasks/user/${user?._id!}`,
                {
                    params: {
                        statuses: [
                            'not_started',
                            'in_progress',
                            'completed'
                        ].join(',')
                    }
                }
            );

            const allTasks: ITaskDTO[] = response.data.data;
            const inProgress = allTasks.filter(
                (task) => task.status === 'in_progress'
            );
            const notStarted = allTasks.filter(
                (task) => task.status === 'not_started'
            );
            const completed = allTasks.filter(
                (task) => task.status === 'completed'
            );
            setInProgressTasks(inProgress);
            setNotStartedTasks(notStarted);
            setCompletedTasks(completed);
        } catch (error: any) {
            setError('Error fetching tasks');
        }
    };

    const getWeeklyTasks = async () => {
        try {
            const response = await axios.get(
                `/api/reports/tasks/user/${user?._id!}/weekly`,
                {
                    params: { startDate: '2024-01-01' }
                }
            );
            setWeeklyTasks(response.data.data);
        } catch (error: any) {
            setError('Error fetching weekly tasks');
        }
    };

    const recentProjects = projects ? projects.slice(0, 3) : [];

    return (
        <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
            {/* ============= SIDEBAR ============= */}
            {/* <aside className="fixed h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">ProjectManager</h1>
          <nav className="space-y-3">
            <SidebarLink icon={<FaHome />} label="Dashboard" active />
            <SidebarLink icon={<FaFolder />} label="Projects" />
            <SidebarLink icon={<FaListAlt />} label="Tasks" />
            <SidebarLink icon={<FaUsers />} label="Teams" />
            <SidebarLink icon={<FaCog />} label="Settings" />
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 text-sm bg-[var(--feature-info-sub-text)] flex items-center space-x-2 cursor-pointer hover:text-white">
          <AiOutlineLogout className="text-lg" />
          <span>Logout</span>
        </div>
      </aside> */}

            {/* ============= MAIN CONTENT ============= */}
            {/* <main className="flex-1 ml-64 p-6"> */}
            <main className="flex-1 p-6">
                {/* Header */}
                {/* <header className="flex justify-between items-center bg-[var(--feature-info-text)] p-4 rounded-xl shadow-sm sticky top-0 z-10">
                    <input
                        type="text"
                        placeholder="Search projects or tasks..."
                        className="border rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </header> */}

                {/* Quick Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
                    <StatCard
                        title="Total Projects"
                        value={projects ? `${projects?.length}` : 'Loading ...'}
                    />
                    <StatCard
                        title="In-Progress Tasks"
                        color="text-blue-600"
                        value={
                            inProgressTasks
                                ? `${inProgressTasks.length}`
                                : 'Loading ...'
                        }
                    />
                    <StatCard
                        title="Completed Tasks"
                        color="text-green-600"
                        value={
                            completedTasks
                                ? `${completedTasks.length}`
                                : 'Loading ...'
                        }
                    />
                    <StatCard
                        title="Not Started Tasks"
                        color="text-[var(--feature-info-text)]"
                        value={
                            notStartedTasks
                                ? `${notStartedTasks.length}`
                                : 'Loading ...'
                        }
                    />
                </section>

                {/* Charts Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
                    <ChartCard title="Task Completion Overview">
                        <TaskCompletionOverview
                            completedTasks={completedTasks as ITaskDTO[]}
                            inProgressTasks={inProgressTasks as ITaskDTO[]}
                            notStartedTasks={notStartedTasks as ITaskDTO[]}
                        />
                    </ChartCard>
                    <ChartCard title="Weekly Task Progress">
                        <WeeklyProgressTrend data={weeklyTasks} />
                    </ChartCard>
                </section>

                {/* Recent Projects Table */}
                <section className="bg-[var(--card)] rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Recent Projects
                    </h3>
                    <table className="w-full text-left bg-[var(--table-bg)]">
                        <thead>
                            <tr className="font-semibold border-b text-sm bg-[var(--table-header-bg)]">
                                <th className="py-2 px-2">Project</th>
                                <th className="py-2 px-2">Owner</th>
                                <th className="py-2 px-2">Status</th>
                                <th className="py-2 px-2">Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProjects.map((project) => (
                                <tr
                                    key={project._id}
                                    className="bg-[var(--table-row-bg)] border-b hover:bg-[var(--table-row-hover)]"
                                >
                                    <td className="px-2 py-3 font-medium">
                                        {project.name}
                                    </td>
                                    <td className="px-2 py-3">
                                        {project.managedBy.email}
                                    </td>
                                    <td className="px-2 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                            ${STATUS_DETAILS[project.status].bgColor} ${STATUS_DETAILS[project.status].textColor}
                        }`}
                                        >
                                            {STATUS_DETAILS[
                                                project.status
                                            ].name.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(
                                            project.endDate
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

function StatCard({
    title,
    value,
    color
}: {
    title: string;
    value: string;
    color?: string;
}) {
    return (
        <div className="bg-[var(--card)] shadow rounded-xl p-5">
            <h4 className="text-[var(--card-text)] text-sm">{title}</h4>
            <p
                className={`text-2xl font-bold ${color || 'text-[var(--feature-info-text)]'}`}
            >
                {value}
            </p>
        </div>
    );
}

function ChartCard({
    title,
    children
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="bg-[var(--card)] rounded-xl shadow p-6 flex flex-col justify-center items-center h-fit">
            <h4 className="text-[var(--feature-info-text)] mb-4 font-semibold">
                {title}
            </h4>
            <div className="text-sm">{children}</div>
        </div>
    );
}
