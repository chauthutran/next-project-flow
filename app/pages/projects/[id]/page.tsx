'use client';

import ProtectedLayout from '@/components/ProtectedLayout';
import ProjectWorkspace from '@/features/project/ProjectWorkspace';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { FaTasks, FaUsers, FaFlag, FaEdit } from 'react-icons/fa';
import { IoMdClipboard } from 'react-icons/io';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function ProjectEditPage() {
    return (
        <ProtectedLayout>
            <ProjectWorkspace />
        </ProtectedLayout>
    );
}
// export default function ProjectWorkspace() {
//     const [project, setProject] = useState({
//         name: 'Website Redesign',
//         description: 'Revamp the company website with a modern UI/UX.',
//         startDate: '2025-10-01',
//         endDate: '2025-12-31',
//         teamMembers: ['John Doe', 'Jane Smith']
//     });

//     const tabs = [
//         { name: 'Details', icon: FaEdit },
//         { name: 'Tasks', icon: FaTasks },
//         { name: 'Meetings', icon: FaUsers },
//         { name: 'Milestones', icon: FaFlag }
//     ];

//     return (
//         <div className="mx-auto max-w-6xl p-6 md:p-10 bg-white rounded-2xl shadow-lg">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-800 mb-1">
//                         {project.name}
//                     </h1>
//                     <p className="text-gray-500">
//                         From {project.startDate} → {project.endDate}
//                     </p>
//                 </div>
//                 <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                     Edit Project
//                 </button>
//             </div>

//             {/* Tabs */}
//             <Tab.Group>
//                 <Tab.List className="flex space-x-1 rounded-xl bg-blue-50 p-1">
//                     {tabs.map((tab) => (
//                         <Tab
//                             key={tab.name}
//                             className={({ selected }) =>
//                                 classNames(
//                                     'w-full flex items-center justify-center space-x-2 py-2.5 text-sm font-medium rounded-lg transition',
//                                     selected
//                                         ? 'bg-blue-600 text-white shadow'
//                                         : 'text-blue-700 hover:bg-blue-100'
//                                 )
//                             }
//                         >
//                             <tab.icon className="h-5 w-5" />
//                             <span>{tab.name}</span>
//                         </Tab>
//                     ))}
//                 </Tab.List>

//                 <Tab.Panels className="mt-6">
//                     {/* --- DETAILS TAB --- */}
//                     <Tab.Panel className="space-y-4">
//                         <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">
//                                     Project Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     defaultValue={project.name}
//                                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">
//                                     Team Members
//                                 </label>
//                                 <input
//                                     type="text"
//                                     defaultValue={project.teamMembers.join(
//                                         ', '
//                                     )}
//                                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">
//                                     Start Date
//                                 </label>
//                                 <input
//                                     type="date"
//                                     defaultValue={project.startDate}
//                                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">
//                                     End Date
//                                 </label>
//                                 <input
//                                     type="date"
//                                     defaultValue={project.endDate}
//                                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div className="md:col-span-2">
//                                 <label className="block text-gray-700 font-medium mb-1">
//                                     Description
//                                 </label>
//                                 <textarea
//                                     defaultValue={project.description}
//                                     rows={4}
//                                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div className="md:col-span-2 flex justify-end">
//                                 <button
//                                     type="submit"
//                                     className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                                 >
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </form>
//                     </Tab.Panel>

//                     {/* --- TASKS TAB --- */}
//                     <Tab.Panel className="space-y-4">
//                         <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                             <IoMdClipboard /> Project Tasks
//                         </h2>
//                         <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
//                             + Add Task
//                         </button>
//                         <ul className="space-y-2">
//                             <li className="border p-3 rounded-md">
//                                 🟢 Design Landing Page
//                             </li>
//                             <li className="border p-3 rounded-md">
//                                 🟡 Develop API endpoints
//                             </li>
//                             <li className="border p-3 rounded-md">
//                                 🔵 Integrate with CMS
//                             </li>
//                         </ul>
//                     </Tab.Panel>

//                     {/* --- MEETINGS TAB --- */}
//                     <Tab.Panel className="space-y-4">
//                         <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                             <FaUsers /> Project Meetings
//                         </h2>
//                         <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
//                             + Schedule Meeting
//                         </button>
//                         <ul className="space-y-2">
//                             <li className="border p-3 rounded-md">
//                                 📅 Kickoff Meeting - Oct 20, 2025
//                             </li>
//                             <li className="border p-3 rounded-md">
//                                 📅 Design Review - Oct 25, 2025
//                             </li>
//                         </ul>
//                     </Tab.Panel>

//                     {/* --- MILESTONES TAB --- */}
//                     <Tab.Panel className="space-y-4">
//                         <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                             <FaFlag /> Project Milestones
//                         </h2>
//                         <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
//                             + Add Milestone
//                         </button>
//                         <ul className="space-y-2">
//                             <li className="border p-3 rounded-md">
//                                 🏁 Prototype Complete - Nov 5, 2025
//                             </li>
//                             <li className="border p-3 rounded-md">
//                                 🏁 Final Launch - Dec 20, 2025
//                             </li>
//                         </ul>
//                     </Tab.Panel>
//                 </Tab.Panels>
//             </Tab.Group>
//         </div>
//     );
// }

// 'use client';

// import ProtectedLayout from '@/components/ProtectedLayout';
// import ProjectFormDetailsPage from '@/features/project/ProjectFormDetailsPage';
// import { useProjects } from '@/hooks/useProjects';
// import { useEffect } from 'react';

// interface Props {
//     id: string;
// }

// export default function ProjectNewForm({ params }: { params: Props }) {
//     const { id } = params;
//     const { selectProject } = useProjects();

//     useEffect(() => {

//     }, []);

//     // const project = await getProjectById(id);
//     // if (!project) return notFound();

//     return (
//         <ProtectedLayout>
//             <ProjectFormDetailsPage id={id} />
//         </ProtectedLayout>
//     );
// }
