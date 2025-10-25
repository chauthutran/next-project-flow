'use client';

import React from 'react';
import Image from 'next/image';
import {
  FaHome,
  FaFolder,
  FaListAlt,
  FaUsers,
  FaCog,
  FaBell,
} from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* ============= SIDEBAR ============= */}
      <aside className="fixed h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
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
      </aside>

      {/* ============= MAIN CONTENT ============= */}
      <main className="flex-1 ml-64 p-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm sticky top-0 z-10">
          <input
            type="text"
            placeholder="Search projects or tasks..."
            className="border rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-lg" />
            <Image
              src="/avatar.png"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </header>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <StatCard title="Total Projects" value="12" />
          <StatCard title="Active Tasks" value="87" />
          <StatCard title="Completed Tasks" value="65" color="text-green-600" />
          <StatCard
            title="Upcoming Deadlines"
            value="4"
            color="text-red-600"
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Task Completion Overview" />
          <ChartCard title="Weekly Progress Trend" />
        </section>

        {/* Recent Projects Table */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
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
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">Website Redesign</td>
                <td>John Doe</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                    In Progress
                  </span>
                </td>
                <td>Oct 30, 2025</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">Mobile App Launch</td>
                <td>Sarah Lee</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    Completed
                  </span>
                </td>
                <td>Oct 10, 2025</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 font-medium">Marketing Campaign</td>
                <td>David Kim</td>
                <td>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                    Delayed
                  </span>
                </td>
                <td>Nov 5, 2025</td>
              </tr>
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
  active = false,
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
  color,
}: {
  title: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className={`text-2xl font-bold ${color || 'text-gray-800'}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title }: { title: string }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 flex flex-col justify-center items-center h-64">
      <h4 className="text-gray-600 mb-4 font-semibold">{title}</h4>
      <div className="text-gray-400 text-sm">[ Chart Placeholder ]</div>
    </div>
  );
}


// export default function DashboardPage() {

//     const { user } = useAuth();
//     const [details, setDetails] = useState<JSONObject>({});
//     const [errMessage, setErrMessage] = useState("");

//     const fetchProjects = async () => {
//         const response: JSONObject = await dbService.fetchProjectsByUserId(user!._id);
//         if( response.status != "success" ) {
//             setErrMessage( response.message );
//         }
//         else {

//             const projects = response.data;

//             const projectIds = projects.map((item: JSONObject) => item._id);

//             const taskResponse = await dbService.fetchTasksByProjectIdList(projectIds);
//             const meetingResponse = await dbService.fetchMeetingsByProjectIdList(projectIds);
//             const milestoneResponse = await dbService.fetchMilestonesByProjectIdList(projectIds);

//             AppStore.setProjectList(projects);
//             AppStore.setDetailsProjectList({tasks: taskResponse.data, meetings: meetingResponse.data, milestones: milestoneResponse.data});
//             setDetails({ projects, tasks: taskResponse.data, meetings: meetingResponse.data, milestones: milestoneResponse.data });
//         }
//     }

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     const getCalendarEvents = (): EventType[] => {
//         let events: EventType[] = [];

//         let tasks = details.tasks && details.tasks.map((item: JSONObject) => {
//             return {
//                 title: item.name,
//                 start: Utils.convertDateStrToObj(item.startDate),
//                 end: Utils.convertDateStrToObj(item.endDate),
//                 color: Utils.getTaskColor()
//             } as EventType
//         });
//         if(!tasks) tasks = [];

//         let milestones = details.milestones && details.milestones.map((item: JSONObject) => {
//             return {
//                 title: item.name,
//                 start: Utils.convertDateStrToObj(item.dueDate),
//                 end: Utils.convertDateStrToObj(item.dueDate),
//                 color: Utils.getMilestoneColor()
//             } as EventType
//         });
//         if(!milestones) milestones = [];

//         let meetings = details.meetings && details.meetings.map((item: JSONObject) => {
//             return {
//                 title: item.name,
//                 start: Utils.convertDateStrToObj(item.date),
//                 end: Utils.convertDateStrToObj(item.date),
//                 color: Utils.getMeetingColor()
//             } as EventType
//         });
//         if(!meetings) meetings = [];

//         return events.concat(tasks, milestones, meetings);
//     }

//     const showProjectDetails = (project: JSONObject) => {
//         AppStore.setProject(project);
//         setMainPage(Constant.PAGE_PROJECT_DETAILS);
//     }

//     const getEventList = () => {
//         const events = getCalendarEvents();
//         const today = new Date(2024, 8, 1); // Get events in time have demo data.
//         const list: EventType[] = events.filter((event: EventType) => today.getTime() <= event.end.getTime() );

//         return list.sort((a,b)=> a.end.getTime() - b.end.getTime());
//     }

//     if( errMessage !== "" ) return (<div className="p-3">{errMessage}</div>);

//     const eventList = getEventList();

//     return (
//         <div className="px-6 my-8 grid grid-cols-1 gap-y-5 gap-x-5 z-10 lg:grid-cols-2 md:grid-cols-2">

//             <div className="space-y-4">
//                 <div className="bg-blue-navy text-slate-50 rounded-lg px-5 py-3 space-y-4">
//                     <div className="text-lg border-b border-light-sky-blue flex">
//                         <div>Project List</div>
//                         <div className="flex-1 flex justify-end space-x-2 mb-2">
//                             <div className="text-slate-600 bg-gold rounded-full p-1 cursor-pointer" onClick={() => setMainPage(Constant.PAGE_USER_TIMELINE)} ><FaTimeline /></div>
//                         </div>

//                     </div>
//                     <div className="space-y-2">
//                         {details.projects && details.projects.map((project: JSONObject, idx: number)=> (
//                             <div key={`project-${project._id}`} className="flex cursor-pointer hover:text-yellow-500 items-center space-x-2" onClick={() => showProjectDetails(project)}>
//                                 <LuGanttChart />
//                                 <span>{project.name}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg p-3 min-w-96 min-h-[520px]">
//                     {/* <Calendar events={[]} onClick={({date: Date, events: EventType[]})=> {}} /> */}
//                     <Calendar events={getCalendarEvents()} onClick={(data: JSONObject)=> { }} initMonth={9} initYear={2024} />
//                 </div>
//             </div>

//             <div className="space-y-4">
//                 <div className="row-span-2 items-center justify-center bg-white rounded-lg p-3 space-y-2 h-full">
//                     <div className="font-bold">Task List</div>
//                     {eventList === undefined && eventList === null ? <div>[No task]</div> :
//                         eventList.map((event: EventType, idx: number) => (
//                             <div key={`today_event_${idx}`} style={{backgroundColor: event.color}} className={`p-2 rounded-md`}>Due date on {Utils.formatDateTimeObj(event.end)} - {event.title}</div>
//                         ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
