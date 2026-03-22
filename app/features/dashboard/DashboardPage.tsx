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
    const [weeklyTasks, setWeeklyTasks] = useState<JSONObject[] | null>(
        null
    );
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
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
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
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400 flex items-center space-x-2 cursor-pointer hover:text-white">
          <AiOutlineLogout className="text-lg" />
          <span>Logout</span>
        </div>
      </aside> */}

            {/* ============= MAIN CONTENT ============= */}
            {/* <main className="flex-1 ml-64 p-6"> */}
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm sticky top-0 z-10">
                    <input
                        type="text"
                        placeholder="Search projects or tasks..."
                        className="border rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-lg" />
            <Image
              src="/avatar.png"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div> */}
                </header>

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
                        color="text-gray-600"
                        value={
                            notStartedTasks
                                ? `${notStartedTasks.length}`
                                : 'Loading ...'
                        }
                    />
                </section>

                {/* Charts Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <ChartCard title="Task Completion Overview">
                        <TaskCompletionOverview
                            completedTasks={completedTasks as ITaskDTO[]}
                            inProgressTasks={inProgressTasks as ITaskDTO[]}
                            notStartedTasks={notStartedTasks as ITaskDTO[]}
                        />
                    </ChartCard>
                    <ChartCard title="Weekly Progress Trend">
                        <WeeklyProgressTrend data={weeklyTasks} />
                    </ChartCard>
                </section>

                {/* Recent Projects Table */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Recent Projects
                    </h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-sm text-gray-600">
                                <th className="py-2">Project</th>
                                <th>Owner</th>
                                <th>Status</th>
                                <th>Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProjects.map((project) => (
                                <tr
                                    key={project._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-3 font-medium">
                                        {project.name}
                                    </td>
                                    <td>{project.managedBy.email}</td>
                                    <td>
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

/* ----------------- Helper Components ----------------- */
function SidebarLink({
    icon,
    label,
    active = false
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}) {
    return (
        <a
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
                active
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </a>
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
        <div className="bg-white shadow rounded-xl p-5">
            <h4 className="text-gray-500 text-sm">{title}</h4>
            <p className={`text-2xl font-bold ${color || 'text-gray-800'}`}>
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
        <div className="bg-white shadow rounded-xl p-5 flex flex-col justify-center items-center h-fit">
            <h4 className="text-gray-600 mb-4 font-semibold">{title}</h4>
            <div className="text-gray-400 text-sm">{children}</div>
        </div>
    );
}
