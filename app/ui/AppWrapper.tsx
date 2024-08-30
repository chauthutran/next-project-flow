"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import { GiThreeLeaves } from "react-icons/gi";
import ProjectDetailsPage from "./project/ProjectDetailsPage";
import * as AppStore from "@/lib/appStore";


export default function AppWrapper() {
   
    const { mainPage, setMainPage } = useMainUi();
    const { user } = useAuth();

    return (
        <main className={`flex-1 overflow-auto bg-opacity-20 bg-royal-blue`}>
            <div className="absolute flex items-end justify-start w-full bottom-14 z-0" >
                <GiThreeLeaves className="text-pale-blue size-96" />
            </div>

            <div className="relative">
                {mainPage === Constant.PAGE_LOGIN && <LoginForm />}
                {mainPage === Constant.PAGE_USER_REGISTRATION && <RegisterForm />}
                {mainPage === Constant.PAGE_DASHBOARD && <Dashboard />}
                {mainPage === Constant.PAGE_PROJECT_DETAILS && <ProjectDetailsPage project={AppStore.getProject()!} />}
            </div>
        </main>
    )
}