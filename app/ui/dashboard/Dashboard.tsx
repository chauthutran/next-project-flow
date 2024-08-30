"use client";

import { useAuth } from "@/contexts/AuthContext";
import { IoSearch } from "react-icons/io5";


export default function Dashboard() {

    const { user } = useAuth();

    return (
        <div className="p-3 grid grid-cols-5 bg-opacity-20 bg-royal-blue w-full h-full">
            <div className="col-span-2">
                <div className="text-2xl font-bold">Welcome, {user!.email.split("@")[0]}</div>
                <div className="text-md">Here is your agendar for today</div>
            </div>
            <div className="col-span-3 items-center justify-center">
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                            id="searchProject"
                            type="text"
                            name="searchProject"
                            // value={email}
                            placeholder="Search"
                            required
                            // onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <IoSearch className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></IoSearch>
                    </div>
            </div>
        </div>
    )
}