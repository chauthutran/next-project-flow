"use client"

import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from '@/lib/constants';
import { useAuth } from "@/contexts/AuthContext";
import { FcTimeline } from "react-icons/fc";
import { CiWavePulse1 } from "react-icons/ci";
import { LuGanttChart } from "react-icons/lu";


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
				<div className={`uppercase ${mainPage === Constant.PAGE_LOGIN && "border-b-4 border-light-sky-blue"} font-semibold pr-5 mr-5`}>Login</div>
				<div className={`uppercase ${mainPage === Constant.PAGE_ABOUT && "border-b-4 border-light-sky-blue"} font-semibold pr-5`}>About</div>
			</div>

			<div className="ml-auto items-center justify-center flex flex-row space-x-2 uppercase">
				<LuGanttChart />
				<div>Register</div>
			</div>
		</header>
	)
}