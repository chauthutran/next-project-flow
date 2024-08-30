"use client"

import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from '@/lib/constants';
import { useAuth } from "@/contexts/AuthContext";
import { FcTimeline } from "react-icons/fc";
import { CiWavePulse1 } from "react-icons/ci";
import { LuGanttChart } from "react-icons/lu";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

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

	return (
		<header className="mx-6 pt-10 mb-10 pr-4 flex flex-row items-center space-x-8 text-sm">
			{/* <div><FcTimeline className="size-8" /></div> */}

			<div className="flex-1 flex">
				{user !== null && <>
					<div className={`uppercase font-semibold pr-5 mr-5 ${mainPage === Constant.PAGE_DASHBOARD && "border-b-4 border-light-sky-blue"}`}>Home</div>
				</>}
				
				{user === null && <div className={`uppercase font-semibold pr-5 mr-5 ${mainPage === Constant.PAGE_LOGIN && "border-b-4 border-light-sky-blue"}`}>Login</div>}
				<div className={`uppercase font-semibold pr-5 mr-5 ${mainPage === Constant.PAGE_ABOUT && "border-b-4 border-light-sky-blue"}`}>About</div>
			</div>

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

			{user !== null && <div className="ml-auto items-center justify-center flex flex-row space-x-1">
				<FaUserCircle className=" size-7 text-blue-navy"/>
			</div>}
		</header>
	)
}