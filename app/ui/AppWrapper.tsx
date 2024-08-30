"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";

export default function AppWrapper() {
    const { mainPage, setMainPage } = useMainUi();
    const { user } = useAuth();

    return (
        <>
            
        </>
    )
}