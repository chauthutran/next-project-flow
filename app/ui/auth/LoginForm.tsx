"use client";

import { CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from "react-icons/io5";
import * as Constant from '@/lib/constants';
import * as Utils from "@/lib/utils";
import { useMainUi } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";
import { FaReact } from 'react-icons/fa'; // Example with Font Awesome React icon
import { FcTimeline } from "react-icons/fc";
import { RiBubbleChartFill } from "react-icons/ri";
import { GiThreeLeaves } from "react-icons/gi";
import { TbChartGridDotsFilled } from "react-icons/tb";
import { LiaChartLineSolid } from "react-icons/lia";
import { SiSoundcharts } from "react-icons/si";
import { LiaChartBar } from "react-icons/lia";
import { AiFillCloud } from "react-icons/ai";
import { AiOutlineBarcode } from "react-icons/ai";
import { AiFillBug } from "react-icons/ai";
import { AiFillOpenAI } from "react-icons/ai";
import { FaChartSimple } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { CiWavePulse1 } from "react-icons/ci";



export default function LoginForm() {

	const { setMainPage, setSubPage } = useMainUi();
	const { user, login, loading, error } = useAuth();

	const [email, setEmail] = useState("manager1@example.com");
	const [password, setPassword] = useState("1234");


	useEffect(() => {
		if (user != null) {
			setMainPage(Constant.PAGE_DASHBOARD);
			setSubPage(null);
		}
	}, [user])

	const handleLoginBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		login(email, password);
	};


	return (
		<div className="justify-center">
			<div className="relative w- h-full py-10">

				<div className="m-4 grid grid-cols-3 h-fit">
					<div className="relative flex flex-col space-y-1 col-span-2 ">
						<div className="flex flex-row space-y-8">
							<div>
								<div className="text-4xl font-bold text-blue-navy mb-2">Project</div>
								<div className="text-4xl font-bold text-blue-navy">FlowMaster</div>
							</div>
							<div className="m-auto justify-end"><RiBubbleChartFill className="size-20 opacity-25 text-sky-blue" /></div>
						</div>
						<div className="text-md border-l-4 m-1 border-slate-800 px-3 text-balance">
							FlowMaster is a comprehensive project management tool designed to streamline workflows. It allows teams to visualize project timelines, track milestones, and manage tasks efficiently. With features like real-time collaboration and customizable dashboards, FlowMaster ensures that every step of your project is organized and transparent.
						</div>
					</div>

					<div className="flex flex-col rounded-lg border-gray-300 border-2 bg-white w-full z-10 px-5 py-5 justify-center">
							<div className="mb-4">
								<label
									className="block text-xs font-medium"
									htmlFor="email"
								>
									Email
								</label>
								<div className="relative">
									<input
										className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
										id="email"
										type="email"
										name="email"
										value={email}
										placeholder="Enter your email"
										required
										onChange={(e) => { setEmail(e.target.value) }}
									/>
									<CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></CiUser>
								</div>
							</div>
							<div className="mb-4">
								<label
									className="block text-xs font-medium"
									htmlFor="password"
								>
									Password
								</label>
								<div className="relative">
									<input
										className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
										id="password"
										type="password"
										name="password"
										placeholder="Enter password"
										value={password}
										required
										minLength={4}
										onChange={(e) => { setPassword(e.target.value) }}
									/>
									<IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
								</div>
							</div>

							<div className="mb-4">
								<button className="flex w-full flex-row bg-blue-navy px-4 py-2 rounded hover:bg-blue-800 text-white cursor-pointer" onClick={(e) => handleLoginBtn(e)} >
									<span className="flex-1">Log in</span>
									{loading && <FaSpinner className="ml-auto h-5" size={20} />}
								</button>
							</div>

							<div className="flex h-8 items-end space-x-1 text-red-500">
								{error != null && <p>{error}</p>}
							</div>
						</div>
				</div>
				
				<div className="absolute inset-0 flex items-end justify-end w-full">
					<RiBubbleChartFill className="text-pale-blue size-32 opacity-65" />
				</div>
			</div>
		</div>
	);
}
