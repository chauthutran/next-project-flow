"use client"

import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from '@/lib/constant';
import { useAuth } from "@/contexts/AuthContext";
import { FcTimeline } from "react-icons/fc";
import { CiWavePulse1 } from "react-icons/ci";
import { LuGanttChart } from "react-icons/lu";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import * as AppStore from "@/lib/appStore";
import { IoMdArrowDropright } from "react-icons/io";
import { FaArrowsSpin } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import { ImPlus } from "react-icons/im";
import { FaMeetup } from "react-icons/fa";
import { LuMilestone } from "react-icons/lu";
import { FaTasks } from 'react-icons/fa';



export default function Header() {

	const { mainPage, setMainPage } = useMainUi();
	const { user, logout } = useAuth();

	const handleLogout = () => {
		const ok = confirm("are you sure you want to logout ?");
		if (ok) {
			logout();
			setMainPage(Constant.PAGE_LOGIN);
		}
	}

	const showDashboard = () => {
		AppStore.setProject(null);
		setMainPage(Constant.PAGE_DASHBOARD)
	}          

	return (
		<header className={`flex flex-row items-center space-x-8 text-sm bg-white z-10 ${user !== null ? "px-6 py-2 border-b-2 border-slate-300 p-3" : "px-6 pt-10 pb-3 pr-4"}`}>

			{user !== null && <div className={`flex-1 flex space-y-1 items-start mb-3 mt-2 flex-col`}  >
				{/* Welcome, {user!.email.split("@")[0]} */}
                <div className="text-2xl transition-transform">Welcome, {user!.email.split("@")[0]}</div>
                <div className="text-md italic">Here is your agendar for today</div>
			</div>}

			{mainPage === Constant.PAGE_PROJECT_DETAILS && <>
				<div className={`uppercase pr-3 cursor-pointer border-b-2 border-white hover:border-light-sky-blue {mainPage === Constant.PAGE_DASHBOARD && "border-b-2 border-light-sky-blue"}`} onClick={() => showDashboard()}>Dashboard</div>
			
				<div className="uppercase pl-5 font-semibold border-l-2 border-slate-200">{AppStore.getProject() !== null && AppStore.getProject()!.name}</div>
				<MdDoubleArrow />

				<div className="uppercase cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue ">Timeline</div>
				<div className="uppercase cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue flex flex-row space-x-1 items-center"><ImPlus className="size-2"/><div>Task</div></div>
				<div className="uppercase cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue flex flex-row space-x-2 items-center"><ImPlus className="size-2"/><div>Meeting</div></div>
				<div className="uppercase cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue flex flex-row space-x-2 items-center"><ImPlus className="size-2"/> <div>Millestone</div></div>

			</>}

			{mainPage === Constant.PAGE_LOGIN && <div className="ml-auto items-center justify-center flex flex-row space-x-1 uppercase">
				<LuGanttChart className="text-torch-red"/>
				<div className="cursor-pointer" onClick={() => setMainPage(Constant.PAGE_USER_REGISTRATION)}>Register</div>
				<RiBarChartHorizontalLine className="text-torch-red" />
			</div>}

			{mainPage === Constant.PAGE_USER_REGISTRATION && <div className="ml-auto items-center justify-center flex flex-row space-x-1 uppercase">
				<LuGanttChart className="text-torch-red"/>
				<div className="cursor-pointer" onClick={() => setMainPage(Constant.PAGE_LOGIN)}>Login</div>
				<RiBarChartHorizontalLine className="text-torch-red" />
			</div>}

			{user !== null && <div className="m-auto items-center justify-center flex flex-row space-x-1">
				<FaUserCircle className=" size-8 text-blue-navy" onClick={() => handleLogout()}/>
			</div>}
		</header>
	)
}