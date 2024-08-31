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
		<header className={`flex flex-row items-center space-x-8 text-sm bg-white z-10 ${user !== null ? "px-6 py-2" : "px-6 pt-10 pb-3 pr-4"}`}>
			{user !== null && <div className={`flex-1 flex space-x-3 items-center my-3`} >
				<div className={`uppercase cursor-pointer ${mainPage === Constant.PAGE_DASHBOARD && "border-b-2 border-light-sky-blue pr-5"}`} onClick={() => showDashboard()}>Dashboard</div>
				{mainPage === Constant.PAGE_PROJECT_DETAILS && <>
					<IoMdArrowDropright />
					<div className="uppercase cursor-pointer border-b-2 border-light-sky-blue pr-5">{AppStore.getProject() !== null && AppStore.getProject()!.name}</div>
				</>}
			</div>}

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