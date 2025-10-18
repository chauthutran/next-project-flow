'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const { user, logout } = useAuth();

    const handleLogout = () => {
        const ok = confirm('are you sure you want to logout ?');
        if (ok) {
            logout();
            router.push('/');
        }
    };

    // Show only title for login page
    if (pathname === '/') {
        return null;
    }

    return (
        <header className="flex items-center justify-between px-6 py-3 border-b bg-[var(--card)] border-[var(--border)] ">
            {/* Left Section - Logo / Title */}
            <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold shadow-sm">
                    PM
                </div>
                <h1 className="text-lg font-semibold text-[var(--text)]">
                    Project FlowMaster
                </h1>
            </div>

            {/* Middle Section - Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-[var(--text)] font-medium">
                <Link
                    href="/pages/dashboard"
                    className="hover:text-[var(--primary)] transition"
                >
                    Dashboard
                </Link>
                <Link
                    href="/pages/projects"
                    className="hover:text-[var(--primary)] transition"
                >
                    Projects
                </Link>
                <Link
                    href="/pages/teams"
                    className="hover:text-[var(--primary)] transition"
                >
                    Teams
                </Link>
                <Link
                    href="/pages/reports"
                    className="hover:text-[var(--primary)] transition"
                >
                    Reports
                </Link>
                <Link
                    href="/pages/profile"
                    className="hover:text-[var(--primary)] transition"
                >
                    Profile
                </Link>
            </nav>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-4">
                {/* Search bar */}
                <div className="hidden lg:flex items-center bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm text-[var(--text)] placeholder-[var(--muted)]"
                    />
                </div>

                {/* Theme toggle */}
                <button
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--secondary)] hover:bg-[var(--accent)] transition"
                    aria-label="Toggle theme"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[var(--primary)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m8.485-8.485h1M3.515 12.515h1M17.657 6.343l.707.707M6.343 17.657l.707.707M17.657 17.657l.707-.707M6.343 6.343l.707-.707M12 8a4 4 0 104 4H8a4 4 0 004-4z"
                        />
                    </svg>
                </button>

                {/* Notification icon */}
                <button className="relative w-9 h-9 flex items-center justify-center rounded-full bg-[var(--secondary)] hover:bg-[var(--accent)] transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[var(--primary)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405C18.213 15.213 18 14.654 18 14V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3c0 .654-.213 1.213-.595 1.595L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--error)] rounded-full"></span>
                </button>

                {/* User avatar */}
                <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold cursor-pointer">
                    T
                </div>
            </div>
        </header>

        // <header className={`flex bg-white px-4 py-3 items-center text-sm z-10 ${user !== null && "border-b border-gray-400"}`}>
        // 	{user !== null && mainPage === Constant.PAGE_DASHBOARD && <div className={`ml-5 flex-1 flex items-start flex-col`}  >
        //         <div className="text-2xl transition-transform">Welcome, {user!.email.split("@")[0]}</div>
        //         <div className="text-md italic">Here is your project list and agendar</div>
        // 	</div>}

        // 	{mainPage === Constant.PAGE_USER_TIMELINE && <>
        // 		<div
        // 			className={`pr-5 uppercase cursor-pointer text-bright-blue hover:text-royal-blue ml-5`}
        // 			onClick={() => showDashboard()
        // 			}><MdDashboard className="size-8"/></div>

        // 		<div className="uppercase pr-5 border-b-2 hover:border-light-sky-blue border-light-sky-blue text-lg">Timeline</div>
        // 	</>}

        // 	{mainPage === Constant.PAGE_PROJECT_DETAILS && <>
        // 		<div
        // 			  className={`pr-5 uppercase cursor-pointer text-bright-blue hover:text-royal-blue ml-5`}
        // 			  onClick={() => showDashboard()
        // 			  }><MdDashboard className="size-8"/></div>

        // 		<div className="flex space-x-4 items-center text-lg">
        // 			  <ProjectNavigation />
        // 		</div>
        // 	</>}

        // 	{mainPage === Constant.PAGE_LOGIN && <div className="ml-auto items-center justify-center flex flex-row space-x-1 uppercase">
        // 		<LuGanttChart className="text-torch-red"/>
        // 		<div className="cursor-pointer" onClick={() => setMainPage(Constant.PAGE_USER_REGISTRATION)}>Register</div>
        // 		<RiBarChartHorizontalLine className="text-torch-red" />
        // 	</div>}

        // 	{mainPage === Constant.PAGE_USER_REGISTRATION && <div className="ml-auto items-center justify-center flex flex-row space-x-1 uppercase">
        // 		<LuGanttChart className="text-torch-red"/>
        // 		<div className="cursor-pointer" onClick={() => setMainPage(Constant.PAGE_LOGIN)}>Login</div>
        // 		<RiBarChartHorizontalLine className="text-torch-red" />
        // 	</div>}

        // 	{user !== null && <div className="m-auto items-center justify-end flex flex-1 flex-row space-x-1">
        // 		<FaUserCircle className=" size-8 text-blue-navy" onClick={() => handleLogout()}/>
        // 	</div>}
        // </header>
    );
}
