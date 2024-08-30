"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import { useEffect, useState } from "react";


export default function AppWrapper() {
   
    const { mainPage, setMainPage } = useMainUi();
    const { user } = useAuth();

    return (
        <main className="flex-1 overflow-auto">
            {mainPage === Constant.PAGE_LOGIN && <LoginForm />}
            {mainPage === Constant.PAGE_USER_REGISTRATION && <RegisterForm />}
        </main>
    )
}